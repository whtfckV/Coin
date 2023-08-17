import { el, setAttr } from "redom";
import WorkApi from "./WorkApi";
import ExchangeSelect from "./ExchangeSelect";

export default class Exchange {
  constructor({ update }) {
    this.updateCurrencies = update;
    this.baseClassesForm = 'currencies__block currencies__exchange exchange';
    this.baseClassesSubmitter = 'btn btn-primary btn-l exchange__submit';
    <div this='el' class={this.baseClassesForm}>
      <form class='exchange__form' onsubmit={this.submit.bind(this)}>
        <fieldset class='exchange__field'>
          <legend class='currencies__title'>Обмен валюты</legend>
          <div class='exchange__group'>
            <div class='exchange__selects'>
              <ExchangeSelect this='from' name='from' descr='Из' />
              <ExchangeSelect this='to' name='to' descr='в' />
              <span this='currencyError' class='error'></span>
            </div>
            <button this='submitter' class={this.baseClassesSubmitter}>Обменять</button>
            <div class='exchange__amount amount'>
              <label class='exchange__label amount__label' for='amount'>Сумма</label>
              <input
                this='amount'
                id='amount'
                class='exchange__select amount__inp inp'
                type='number'
                min='0'
                step='0.01'
                oninput={this.handleInput}
                onkeypress={this.handleKeypress}
              />
              <span this='otherError' class='error'></span>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  };

  set load(bool) {
    this._load = bool;

    this._load ?
      setAttr(this.el, {
        className: `${this.baseClassesForm} skeleton`
      }) :
      setAttr(this.el, {
        className: this.baseClassesForm
      });
  };

  get load() {
    return this._load;
  };

  set submiting(bool) {
    this._submiting = bool;

    setAttr(this.submitter, {
      disabled: this.submiting
    });
  };

  get submiting() {
    return this._submiting;
  };

  onmount() {
    this.fetch();
  };

  update() {
    this.from.update(this.data);
    this.to.update(this.data);
  };

  async fetch() {
    this.load = true;
    try {
      const { payload, error } = await WorkApi.getKnownCurrencies();
      if (error) {
        throw new Error(error);
      };
      this.data = payload;
      this.update();
    } catch (error) {
      console.log(error);
      throw new Error(error)
    } finally {
      this.load = false;
    };
  };

  error(error) {
    switch (error) {
      case 'equal':
        this.currencyError.textContent = 'Валюты одинаковые'
        break;
      case 'empty':
        this.otherError.textContent = 'Поле не должно быть пустым'
        break;
      case 'Unknown currency code':
        this.currencyError.textContent = 'передан неверный валютный код'
        break;
      case 'Invalid amount':
        this.otherError.textContent = 'Не указана сума перевода'
        break;
      case 'Not enough currency':
        this.otherError.textContent = 'На счете нет средств'
        break;
      case 'Overdraft prevented':
        this.otherError.textContent = 'Недостаточно средств'
        break;
      default:
        throw new Error(error);
        break;
    }
  };

  handleInput(e) {
    if (e.inputType === 'insertFromPaste')
      this.value = this.value.replace(/[^0-9\.]/, '');
  };

  handleKeypress(e) {
    if (e.key === '-') e.preventDefault();
  };

  async submit(e) {
    e.preventDefault();

    this.currencyError.textContent = '';
    this.otherError.textContent = '';

    if (this.from.value === this.to.value) {
      this.error('equal');
      return;
    };

    if (!this.amount.value.length) {
      this.error('empty');
      return;
    };

    this.submiting = true;
    try {
      const { payload, error } = await WorkApi.exchangeCurrency(
        this.from.value,
        this.to.value,
        Number(this.amount.value),
      );

      if (error) {
        throw new Error(error);
      };

      this.updateCurrencies(payload);
      this.amount.value = '';

    } catch (error) {
      this.error(error.message)
    } finally {
      this.submiting = false;
    };
  };
};
