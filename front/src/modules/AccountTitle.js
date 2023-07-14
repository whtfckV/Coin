import { el } from "redom";

export default class AccountTitle {
  constructor({ account }) {
    <h2 this='el' class='top-info__title'>{`№ ${account}`}</h2>
  };
};
