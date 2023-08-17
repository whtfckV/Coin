import { el } from "redom";

export default class AccountTitle {
  constructor({ account }) {
    <h2 this='el' class='account__title'>{`№ ${account}`}</h2>
  };
};
