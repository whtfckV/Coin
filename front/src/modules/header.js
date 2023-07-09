import { el } from "redom";
import Logo from "./Logo";
import Nav from "./Nav";

export const nav = <Nav />;

export default class Header {
  constructor() {
    <header this='el' class='header'>
      <div this='container' class='container header__container'>
        <Logo />
        {nav}
      </div>
    </header>
  };
};
