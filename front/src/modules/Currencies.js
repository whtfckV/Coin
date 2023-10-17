import { el } from "redom";
import YourCurrencies from "./YourCurrencies";
import Exchange from "./Exchange";
import Strim from "./Strim";
import { Swappable, Plugins } from '@shopify/draggable';

export default class Currencies {
  constructor() {
    <div this='el' class='currencies'>
      <div data-drag='container'>
        <div class='Block--isDraggable'>
          <YourCurrencies this='currencies' />
        </div>
      </div>
      <div data-drag='container'>
        <div class='Block--isDraggable'>
          <Strim />
        </div>
      </div>
      <div data-drag='container'>
        <div class='Block--isDraggable'>
          <Exchange update={this.update} />
        </div>
      </div>
    </div>
  };

  update = data => {
    this.currencies.data = data;
  };

  onmount() {
    const containers = Array.from(document.querySelectorAll('[data-drag=container]'));
    // console.log(containers)

    const swappable = new Swappable(containers, {
      draggable: '.Block--isDraggable',
      // mirror: {
      //   appendTo: this.el.children,
      //   constrainDimensions: true,
      // },
      plugins: [Plugins.ResizeMirror],
    });

  }
};


// export default function GridLayout() {
//   const containers = document.querySelectorAll(containerSelector);

//   if (containers.length === 0) {
//     return false;
//   }


//   return swappable;
// }
