import { el, mount, setAttr, unmount, setChildren } from "redom";
import { accountContainer } from "../router/routes/account";
import { transferIcon } from "../scripts/Icons";
import AccountInfo from "./AccountInfo";
import WorkApi from "./WorkApi";

/*
  ОСТАНОВИЛСЯ ЗДЕСЬ, ПЕРЕДЕЛАНА ТОЛЬКО РАЗМЕТКА ВЕСЬ ФУНКЦИОНАЛ СТАРЫЙ
*/

export default class Transfer {
  // static state = {
  //   error: {
  //     am: false,
  //     rec: false
  //   }
  // };
  // static count = 0;
  // static oldAccounts = JSON.parse(localStorage.getItem('accounts')) ?? [];
  // static oldAccountsList = el('ul.list-reset.form-transfer__dropdown', this.oldAccounts
  //   .map(this.createListElement.bind(this)));

  constructor({ account }) {
    this.account = account;
    this.oldAccounts = JSON.parse(localStorage.getItem('accounts')) ?? [];
    <from
      this='el'
      class='account__form-transfer form-transfer bg-grey'
      onsubmit={() => { console.log('submit') }}
    >
      <fieldset class='form-transfer__field'>
        <legend class='form-transfer__name subtitle'>Новый перевод</legend>
        <label class='form-transfer__lbl' for='recipient'>Номер счета получателя</label>
        <div class='form-transfer__group'>
          <input
            this='recipient'
            id='recipient'
            class='inp form-transfer__inp'
            autocomplete='off'
          // oninput={this.handleInputRecipient}
          // onfocus={this.handleFocus.bind(this)}
          />
          <span class='form-transfer__error'></span>
        </div>
        <label class='form-transfer__lbl' for='transferAmount'>Сумма перевода</label>
        <div class='form-transfer__group'>
          <input
            this='amount'
            id='transferAmount'
            class='inp form-transfer__inp'
            autocomplete='off'
          // oninput={this.handleInputAmount}
          />
          <span class='form-transfer__error'></span>
        </div>
        <button onclick={this.handleSubmit.bind(this)} class='btn btn-l btn-primary btn-icon-text form-transfer__btn' type='submit'>
          {transferIcon}
          <span>Отправить</span>
        </button>
      </fieldset>
    </from >
  };

  onmount() {
    console.log('%cform mount', 'color: coral;');
  };

  // static setState({ account }) {
  //   this.account = account;
  // };

  handleSubmit(e) {
    e.preventDefault();

    // const recipientInp = this.elements['recipient'];
    // const amountInp = this.elements['transferAmount'];
    console.log(this.recipient.value);
    console.log(this.amount.value);

    // if (!Transfer.isValid()) {
    //   return;
    // };

    // const recipient = recipientInp.value;
    // const amount = amountInp.value;

    // WorkApi.transferFunds(Transfer.account, recipient, amount)
    //   .then(({ payload, error }) => {
    //     if (error) throw new Error(error);
    //     const balance = payload.balance;

    //     if (!Transfer.oldAccounts.includes(recipient)) {
    //       Transfer.oldAccounts.push(recipient);
    //       localStorage.setItem('accounts', JSON.stringify(Transfer.oldAccounts));
    //     };

    //     AccountInfo.setState({ balance });
    //     recipientInp.value = '';
    //     amountInp.value = '';
    //   })
    //   .catch(error => {
    //     switch (error.message) {
    //       case 'Invalid account to':
    //         Transfer.setError('rec', 'Аккаунта с таким номером нет');
    //         return;
    //       case 'Overdraft prevented':
    //         Transfer.setError('am', 'Недостаточно средств на балансе');
    //         return;
    //       default:
    //         throw new Error(error);
    //     }
    //   });
  };

  handleFocus() {
    if (this.oldAccounts.length) {

      setChildren(this.oldAccountsList, this.oldAccounts
        .map(this.createListElement.bind(this)));

      mount(this.recipientGroup, this.oldAccountsList);

      document.addEventListener('click', this.handleClickOut);
      this.recipientGroup.addEventListener('keydown', this.handleKeyDown);
    };
  };

  /*
    😅
    Решил сделать перемещение по выподающему списку стрелками
    не доделал

  */
  // static handleKeyDown() {
  //   if (document.activeElement === Transfer.recipient) {
  //     Transfer.oldAccountsList.children[Transfer.count].children[0].focus()
  //   } else {
  //     Transfer.recipient.focus()
  //   };
  // };

  // static handleClickOut({ target }) {
  //   if (!Transfer.recipientGroup.contains(target)) {
  //     Transfer.recipientGroup.removeEventListener('keydown', Transfer.handleKeyDown);
  //     document.removeEventListener('click', Transfer.handleClickOut);
  //     unmount(Transfer.recipientGroup, Transfer.oldAccountsList);
  //   };
  // };

  handleInputRecipient() {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (Transfer.state.error.rec) {
      Transfer.setError('rec', '');
      Transfer.state = {
        error: {
          ...Transfer.state.error,
          rec: false
        }
      };
    };

    if (Transfer.recipientGroup.contains(Transfer.oldAccountsList)) {
      setChildren(Transfer.oldAccountsList, Transfer.oldAccounts
        .filter(account => account.includes(this.value))
        .map(Transfer.createListElement.bind(Transfer)));
    };
  };

  handleInputAmount() {
    this.value = this.value.replace(/[^0-9]/g, '');
    if (Transfer.state.error.am) {
      Transfer.setError('am', '');
      Transfer.state = {
        error: {
          ...Transfer.state.error,
          am: false
        }
      };
    };
  };

  // static createListElement(account) {
  //   return el('li.form-transfer__dropdown-item', el('button.form-transfer__dropdown-btn', {
  //     onclick: this.handleClick
  //   }, account));
  // };

  handleClick(event) {
    Transfer.recipient.value = event.target.textContent;
    if (Transfer.state.error.rec) {
      Transfer.setError('rec', '');
      Transfer.state = {
        error: {
          ...Transfer.state.error,
          rec: false
        }
      };
    };
    Transfer.recipientGroup.removeEventListener('keydown', Transfer.handleKeyDown);
    document.removeEventListener('click', Transfer.handleClickOut);
    unmount(Transfer.recipientGroup, Transfer.oldAccountsList);
  };

  setError(fieldName, error) {
    const field = {
      rec: this.recipientError,
      am: this.transferAmountError
    };

    if (error) {
      setAttr(field[fieldName].previousSibling, {
        ariaInvalid: 'true'
      });
      this.state = {
        error: {
          ...this.state.error,
          [fieldName]: true
        }
      };
    } else {
      setAttr(field[fieldName].previousSibling, {
        ariaInvalid: ''
      });
    }
    field[fieldName].textContent = error;
  };

  isValid() {
    const emptyRecipient = !this.recipient.value.trim();
    const emptyAmount = !this.transferAmount.value.trim();
    const errors = [];

    this.recipientError.textContent = '';
    this.transferAmountError.textContent = '';
    setAttr(this.recipient, {
      ariaInvalid: ''
    });
    setAttr(this.transferAmount, {
      ariaInvalid: ''
    });

    if (emptyRecipient) {
      setAttr(this.recipient, {
        ariaInvalid: 'true'
      });
      this.setError('rec', 'Поле не должно быть пустым')
      errors.push('rec');
    } else {
      setAttr(this.recipient, {
        ariaInvalid: ''
      });
    };
    if (emptyAmount) {
      setAttr(this.transferAmount, {
        ariaInvalid: 'true'
      });
      this.setError('am', 'Поле не должно быть пустым')
      errors.push('am');
    } else {
      setAttr(this.transferAmount, {
        ariaInvalid: ''
      });
    };
    return !errors.length;
  };
};
