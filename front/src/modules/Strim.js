import WorkApi from "./WorkApi";
import { el, mount } from "redom";

export default class Strim {
  constructor() {
    this.currencies = {};
    this.list = el('ul.currency__list');
  }

  set change(data) {
    this._change = data;
    this.renderCurrecy();
  };

  get change() {
    return this._change;
  };

  render() {
    return [
      el('h2.currencies__title', 'Изменение курсов в реальном времени'),
      this.list
    ];
  }

  connect() {
    WorkApi.getChangedCurrency().then(socket => {
      this.socket = socket;
      socket.addEventListener('message', e => {
        this.change = JSON.parse(e.data);
      })
    }).catch(error => console.log(error));
  }

  close() {
    this.socket.close();
  };

  renderCurrecy() {
    let { from, to, rate, change } = this.change;
    change = String(change);

    const classes = {
      '1': 'up',
      '0': 'no-change',
      '-1': 'down',
    }

    if (this.currencies[`${from}/${to}`]) {
      this.currencies[`${from}/${to}`].classList.remove('up', 'down', 'no-change');
      this.currencies[`${from}/${to}`].classList.add(classes[change]);
    } else {
      this.currencies[`${from}/${to}`] = el(`li.strim.currency.${classes[change]}`, [
        el('span.currency__name', `${from}/${to}`),
        el('span.currency__amount', rate),
      ]);
      mount(this.list, this.currencies[`${from}/${to}`]);
    }
  }
}
