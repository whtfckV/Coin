import { el, mount, unmount } from "redom";
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

  update(path = '/') {

    if (path === '/') unmount(this.header.children[0], this.nav);

    this.nav.querySelectorAll('a').forEach(link => {
      link.classList.remove('active');

      if (link.getAttribute('href').slice(1) === path) {
        link.classList.add('active');
      };
    })

    if (!this.header.children[0].contains(this.nav) && path !== '/') {
      mount(this.header.children[0], this.nav);
    }
  }
}

