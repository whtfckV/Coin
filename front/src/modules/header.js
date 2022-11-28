import { el, mount } from "redom";
import createNav from "./nav";

export class Header {
  constructor() {
    this.logo = 'Coin.';
    this.nav = createNav();
    this.header = el('header.header',
      el('div.container.header__container', [
        el('span.header__logo',
          this.logo
        ),
      ])
    );
  }

  update(path) {
    this.nav.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href') === path) {
        link.classList.add('active');
      };
    })

    mount(this.header.children[0], this.nav)
  }
}

