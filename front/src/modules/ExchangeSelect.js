import { el, setChildren } from 'redom';

export default class ExchangeSelect {
  constructor({ name, descr }) {
    this.data;
    <div this='el' class={`exchange__selects_${name}`}>
      <label class='exchange__label' for={name}>{descr}</label>
      <select
        this='select'
        id={name}
        class='exchange__select inp'
        onchange={this.onChange.bind(this)}
      ></select>
    </div>
  };

  onChange(e) {
    this.value = this.select.value;
  }

  update(list) {
    this.data = list;
    this.value = this.data[0];
    setChildren(this.select,
      this.data.map(currency => <option value={currency}>{currency}</option>)
    );
  };
};
