import WorkApi from "../scripts/WorkApi";
import { el, mount, setAttr } from "redom";

export default class Strim {
  constructor() {
    this.currencies = {};
    this.classes = {
      '1': 'up',
      '0': 'no-change',
      '-1': 'down',
    };
    this.defaultClasses = 'currencies__block  bg-grey currencies__strim';
    <div this='el' class={this.defaultClasses}>
      <h2 class='currencies__title'>Изменение курсов в реальном времени</h2>
      <ul this='list' class='currency__list list-reset'></ul>
    </div>
  };

  onmount() {
    this.connect();
  };

  onunmount() {
    this.socket.close();
  };

  set load(bool) {
    this._load = bool;
    setAttr(this.el, {
      className: `${this.defaultClasses} ${this.load ? 'skeleton' : ''}`
    });
  };

  get load() {
    return this._load;
  };

  async connect() {
    this.load = true;
    try {
      this.socket = await WorkApi.getChangedCurrency();

      this.socket.addEventListener('message', e => {
        this.renderCurrecy(JSON.parse(e.data));
      });

    } catch (error) {
      console.error(error);
    } finally {
      this.load = false;
    };
  };

  renderCurrecy({ from, to, rate, change }) {
    change = String(change);

    if (this.currencies[`${from}/${to}`]) {
      setAttr(this.currencies[`${from}/${to}`], {
        className: `strim currency ${this.classes[change]}`
      });
    } else {
      this.currencies[`${from}/${to}`] = <li class={`strim currency ${this.classes[change]}`}>
        <span class='currency__name'>{`${from}/${to}`}</span>
        <span class='currency__amount'>{rate}</span>
      </li>;
      mount(this.list, this.currencies[`${from}/${to}`]);
    };
  };
};
