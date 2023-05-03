import { el, unmount, mount } from "redom";
import Logo from "./Logo";
import Nav from "./Nav";

export const nav = <Nav />;

export default class Header {
  constructor() {
    <header this='el' class='header'>
      <div this='container' class='container header__container'>
        <Logo />
        {nav}
        {/* <Nav this='nav' /> */}
      </div>
    </header>
  };


  // update() {
  //   this.path = router.getCurrentLocation().url;
  //   if (!this.path) {
  //     unmount(this.container, this.nav);
  //     return;
  //   };

  //   if (this.nav) {
  //     if (!this.container.contains(this.nav) && this.path !== '/') {
  //       mount(this.container, this.nav);
  //     };
  //   };
  //   this.nav.update();

  //   router.updatePageLinks();
  // };
};
