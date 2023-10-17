import { el, mount, setAttr, setChildren } from "redom";
import { transferIcon } from "../scripts/Icons";
import WorkApi from "../scripts/WorkApi";
import Dropdown from "./Dropdown";
import Toast from "../scripts/toast";

export default class Transfer {
  constructor({ account, updateInformation }) {
    this.errors = {
      recipient: false,
      amount: false
    };
    this.account = account;
    this.updateInformation = updateInformation;
    this.defaultClasses = 'account__form-transfer form-transfer bg-grey';
    this.fieldset = <fieldset class='form-transfer__field'>
      <legend class='form-transfer__name subtitle'>Новый перевод</legend>
      <label class='form-transfer__lbl' for='recipient'>Номер счета получателя</label>
      <div class='form-transfer__group'>
        <input
          this='recipient'
          id='recipient'
          class='inp form-transfer__inp'
          data-test='recipient'
          autocomplete='off'
          onblur={this.handleBlur.bind(this)}
          oninput={this.handleInputRecipient.bind(this)}
          onfocus={this.handleFocus.bind(this)}
        />
        <span this='recipientError' data-name='recipient' class='form-transfer__error'></span>
      </div>
      <label class='form-transfer__lbl' for='amount'>Сумма перевода</label>
      <div class='form-transfer__group'>
        <input
          this='amount'
          id='amount'
          class='inp form-transfer__inp'
          data-test='amount'
          type='number'
          min='0'
          step='0.01'
          autocomplete='off'
          oninput={this.handleInputAmount.bind(this)}
          onkeypress={this.handleKeypress}
        />
        <span this='amountError' data-name='amount' class='form-transfer__error'></span>
      </div>
      <button
        this='submitter'
        class='btn btn-l btn-primary btn-icon-text form-transfer__btn'
        data-test='transfer'
        type='submit'>
        {transferIcon}
        <span>Отправить</span>
      </button>
    </fieldset>;
    <form
      this='el'
      class={this.defaultClasses}
      onsubmit={this.handleSubmit.bind(this)}
    ></form >
    this.oldAccountsList = <Dropdown handleClick={this.handleClick.bind(this)} target={this.recipient} />;
  };

  set load(bool) {
    this._load = bool;
    setAttr(this.el, {
      className: `${this.defaultClasses} ${this.load ? 'skeleton' : ''}`
    });
    if (!this.load) {
      setChildren(this.el, this.fieldset)
    };
  };

  get load() {
    return this._load;
  };

  set submitting(bool) {
    this._submitting = bool;

    // блокировка кнопки на время запроса
    setAttr(this.submitter, {
      disabled: this.submitting
    });
  };

  get submitting() {
    return this._submitting;
  };

  // Запрос на перевод
  async handleSubmit(e) {
    e.preventDefault();

    if (!this.isValid()) {
      return;
    };

    this.submitting = true;
    try {
      const recipient = this.recipient.value;
      const amount = this.amount.value;
      const { payload, error } = await WorkApi.transferFunds(this.account, recipient, amount);

      if (error) {
        throw new Error(error);
      };
      this.updateInformation({
        balance: payload.balance,
        lastTransaction: payload.transactions[payload.transactions.length - 1],
        allTransactions: payload.transactions,
      });
      this.recipient.value = '';
      this.amount.value = '';

      // Добавление нового адреса в список
      if (!this.oldAccountsList.list.includes(recipient)) {
        this.oldAccountsList.list = [
          ...this.oldAccountsList.list,
          recipient
        ];
      };

    } catch (error) {
      switch (error.message) {
        case 'Invalid account from':
          this.setError(this.recipientError, 'Не указан адрес счёта списания')
          break;
        case 'Invalid account to':
          this.setError(this.recipientError, 'Такого счёта не существует')
          break;
        case 'Invalid amount':
          this.setError(this.amountError, 'Не указана сумма перевода, или она отрицательная')
          break;
        case 'Overdraft prevented':
          this.setError(this.amountError, 'на счёте недостаточно средств')
          break;
        case 'Failed to fetch':
          new Toast({
            title: 'Упс, что-то пошло не так',
            text: 'Не удалось получить ответ от сервера',
            theme: 'danger',
            autohide: true,
            interval: 10000,
          });
          break;
        default:
          throw new Error(error);
      }
    } finally {
      this.submitting = false;
    };
  };

  // Выпадение списка при фокусе
  handleFocus() {
    console.log(this.oldAccountsList.list)
    if (this.oldAccountsList.list.length) {
      mount(document.getElementById('modal'), this.oldAccountsList);
    };
  };

  // Закрытие списка при нажатии tab в поле recipirnt
  handleBlur() {
    if (this.oldAccountsList.index === -1) {
      this.oldAccountsList.close();
    };
  };

  handleInputRecipient() {
    this.recipient.value = this.recipient.value.replace(/[^0-9]/g, '');
    if (this.errors.recipient) {
      this.setError(this.recipientError, '');
      this.errors = {
        ...this.errors,
        recipient: false
      };
    };

    // Фильтрация списка при вводе
    this.oldAccountsList.filter(this.recipient.value);
  };

  // Невозможность ввести минус
  handleKeypress(e) {
    if (e.key === '-') e.preventDefault();
  };

  // Исчезновение ошибки
  handleInputAmount() {
    if (this.errors.amount) {
      this.setError(this.amountError, '');
      this.errors = {
        ...this.errors,
        amount: false
      };
    };
  };

  // Выбор номера из списка
  handleClick(event) {
    this.recipient.value = event.target.textContent;
    this.recipient.focus();
    this.oldAccountsList.close();
    if (this.errors.recipient) {
      this.setError(this.recipientError, '');
      this.errors = {
        ...this.errors,
        recipient: false
      };
    };
  };

  // Установка ошибки на поле
  setError(errorField, error) {
    if (error) {
      setAttr(errorField.previousSibling, {
        ariaInvalid: 'true'
      });
      this.errors = {
        ...this.errors,
        [`${errorField.dataset.name}`]: true
      };
    } else {
      setAttr(errorField.previousSibling, {
        ariaInvalid: ''
      });
    }
    errorField.textContent = error;
  };

  // Проверка на валидность
  isValid() {
    const emptyRecipient = !this.recipient.value.trim();
    const emptyAmount = !this.amount.value.trim();
    let isValid = true;

    this.recipientError.textContent = '';
    this.amountError.textContent = '';
    setAttr(this.recipient, {
      ariaInvalid: '',
    });
    setAttr(this.amount, {
      ariaInvalid: '',
    });

    if (emptyRecipient) {
      setAttr(this.recipient, {
        ariaInvalid: 'true'
      });
      this.setError(this.recipientError, 'Поле не должно быть пустым');
      isValid = false;
    } else {
      setAttr(this.recipient, {
        ariaInvalid: ''
      });
    };
    if (emptyAmount) {
      setAttr(this.amount, {
        ariaInvalid: 'true'
      });
      this.setError(this.amountError, 'Поле не должно быть пустым')
      isValid = false;
    } else {
      setAttr(this.amount, {
        ariaInvalid: ''
      });
    };
    return isValid;
  };
};
