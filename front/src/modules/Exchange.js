import { el, setChildren } from "redom";
import WorkApi from "./WorkApi";

export default class Exchange {
  constructor(container) {
    this.container = container;

    this.render();
  }

  set load(bool) {
    this._load = bool;

    this._load ?
      this.container.classList.add('skeleton') :
      this.container.classList.remove('skeleton');
  }

  get load() {
    return this._load;
  }

  async fetch() {
    this.load = true;
    try {
      const { payload, error } = await WorkApi.getKnownCurrencies();

      if (error) {
        throw new Error(error)
      } else {
        this.data = payload;
      }

    } catch (error) {
      throw new Error(error);
    } finally {
      this.load = false;
    }
  }

  async makeExchange() {
    return await WorkApi.exchangeCurrency()
  }

  render() {
    this.fetch().then(() => {
      setChildren(this.container, el('form.exchange__form', {
        onsubmit(e) {
          e.preventDefault();

          WorkApi.exchangeCurrency(
            this.elements['from'].value,
            this.elements['to'].value,
            this.elements['amount'].value,
          ).then(({ payload, error }) => {

            if (error) throw new Error(error);

            this.dispatchEvent(new CustomEvent('exchange', {
              bubbles: true,
              detail: payload
            }));

            this.elements['amount'].value = '';
          }).catch(error => console.log(error));
        }
      }, el('fieldset.exchange__field', [
        el('legend.currencies__title', 'Обмен валюты'),
        el('div.exchange__group', [
          el('div.exchange__selects', [
            el('div.exchange__selects_from', [
              el('label.exchange__label', {
                for: 'from'
              }, 'Из'),
              el('select.exchange__select#from', this.data.map(currency => el(
                'option', {
                value: currency
              }, currency))),
            ]),
            el('div.exchange__selects_to', [
              el('label.exchange__label', {
                for: 'to'
              }, 'в'),
              el('select.exchange__select#to', this.data.map(currency => el(
                'option', {
                value: currency
              }, currency))),
            ]),
          ]),
          el('button..btn.btn-primary.btn-l.exchange__submit', 'Обменять'),
          el('div.exchange__amount.amount', [
            el('label.exchange__label.amount__label', {
              for: 'amount'
            }, 'Сумма'),
            el('input.exchange__select.amount__inp#amount', {
              type: 'number',
              min: 0,
              step: 0.01,
              oninput(e) {
                if (e.inputType === 'insertFromPaste')
                  this.value = this.value.replace(/[^0-9\.]/, '');
              },
              onkeypress(e) {
                if (e.key === '-') e.preventDefault()
              }

            }),
          ]),
        ])
      ])));
    })
  }
}
