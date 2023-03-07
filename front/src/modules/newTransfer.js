import { setChildren, el, svg, mount, unmount } from "redom";

const icon = svg('svg', {
  width: 20,
  height: 16,
  viewBox: '0 0 20 16',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg'
}, svg('path', {
  d: 'M18 16H2C0.89543 16 0 15.1046 0 14V1.913C0.0466084 0.842547 0.928533 -0.00101428 2 -9.95438e-07H18C19.1046 -9.95438e-07 20 0.89543 20 2V14C20 15.1046 19.1046 16 18 16ZM2 3.868V14H18V3.868L10 9.2L2 3.868ZM2.8 2L10 6.8L17.2 2H2.8Z',
  fill: 'white',
}));

export default class NewTransfer {
  static oldAccounts = JSON.parse(localStorage.getItem('accounts'));

  constructor(container, account) {
    this.container = container;
    this.account = account;
  }

  static updateOldAccounts() {
    this.oldAccounts = JSON.parse(localStorage.getItem('accounts'));
  };

  static returnList(list, input) {
    this.oldAccountList = el('ul.account__dropdown', list
      .filter(account => account.includes(input.value))
      .map(account => el('li.account__dropdown-item', {
        onclick() {
          console.log('click')
          input.value = this.textContent;
          unmount(input.parentElement, NewTransfer.oldAccountList);
        }
      }, account)));

    return this.oldAccountList.children.length ? this.oldAccountList : '';
  }

  render() {
    this.form = el('form', el('fieldset', [
      el('legend', 'Новый перевод'),
      el('label', {
        for: 'recipient'
      }, [
        el('span', 'Номер счета получателя'),
        el('input#recipient', {
          autocomplete: 'off',
          oninput(e) {
            if (e.inputType === 'insertFromPaste') {
              this.value = this.value.replace(/[^0-9]/g, '');
            }
            this.value = this.value.replace(/[^0-9]/, '');

            unmount(this.parentElement, NewTransfer.oldAccountList);
            mount(this.parentElement, NewTransfer.returnList(NewTransfer.oldAccounts, this));
          },
          onfocus() {
            mount(this.parentElement, NewTransfer.returnList(NewTransfer.oldAccounts, this));

            // if (!this.value) {
            //   mount(this.parentElement, NewTransfer.returnList(NewTransfer.oldAccounts));
            // } else {
            //   console.log(NewTransfer.oldAccounts.filter(account => account.includes(this.value)));
            //   // mount(this.parentElement, NewTransfer.returnList(NewTransfer.oldAccounts));
            // }
          },
          onblur() {
            setTimeout(() => {
              unmount(this.parentElement, NewTransfer.oldAccountList)
            }, 100)
          }
        }),
      ]),
      el('label', {
        for: 'transferAmount'
      }, 'Сумма перевода'),
      el('input#transferAmount', {
        autocomplete: 'off',
      }),
      el('button.btn.btn-l.btn-primary.btn-icon-text', [
        icon,
        el('span', 'Отправить')
      ]),
    ]))
    setChildren(this.container, this.form);
    this.container.classList.remove('skeleton');
  }
}
