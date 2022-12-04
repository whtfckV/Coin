import WorkApi from "./WorkApi";

export default class Strim {
  constructor(container) {
    this.container = container;
    this.currencies = {};

    // this.connect()
  }

  set change(data) {
    this._change = data;
    this.renderCurrecy();
  };

  get change() {
    return this._change;
  };

  connect() {
    WorkApi.getChangedCurrency().then(socket => {
      socket.addEventListener('message', e => {
        this.change = JSON.parse(e.data);
      })
    }).catch(error => console.log(error));
  }

  renderCurrecy() {
    const { from, to } = this.change;
    console.log(this.currencies[`${from}/${to}`] ?? '%cНема😔', 'color: coral;font-size: 16px;');
    this.currencies[`${from}/${to}`] = this.change;
    console.log(this.currencies[`${from}/${to}`]);
  }
}
