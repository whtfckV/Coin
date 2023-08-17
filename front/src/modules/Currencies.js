import { el } from "redom";
import YourCurrencies from "./YourCurrencies";
import Exchange from "./Exchange";
import Strim from "./Strim";

export default class Currencies {
  constructor({ account }) {
    <div this='el' class='currencies'>
      <YourCurrencies this='currencies' />
      <Strim />
      <Exchange update={this.update} />
    </div>
  };

  update = data => {
    this.currencies.data = data;
  };
};
