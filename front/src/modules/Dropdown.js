import { el, setStyle, unmount, mount, setChildren } from 'redom';

export default class Dropdown {
  constructor({ handleClick, target }) {
    this.container = document.getElementById('modal');
    this.list = JSON.parse(localStorage.getItem('oldAccounts')) ?? [];
    this.index = 0;
    this.target = target;
    this.handleClick = handleClick;
    this.accountsItems = this.list.map(this.createListElement.bind(this));
    <ul this='el' class='list-reset form-transfer__dropdown'>
      {this.accountsItems}
    </ul>
  };

  // Обновление списка используемых ранее аккаунтов
  set list(accountsList) {
    this._list = accountsList;
    localStorage.setItem('oldAccounts', JSON.stringify(this.list));
  };

  get list() {
    return this._list;
  };

  onmount() {
    // Сбор актуальной информации о списке
    this.list = JSON.parse(localStorage.getItem('oldAccounts')) ?? [];
    this.accountsItems = this.list.map(this.createListElement.bind(this));
    this.filter('');

    // Закрытие по клику вне
    document.addEventListener('click', this.handleClickOut);

    // Размещение
    const { x, y, width, height } = this.target.getBoundingClientRect();
    setStyle(this.el, {
      position: 'absolute',
      top: `${y + height + window.scrollY}px`,
      left: `${x}px`,
      width: `${width}px`
    });

    // Создание списка кнопок для навигации стрелками
    this.createButtonsList();
    document.addEventListener('keydown', this.handleKeyDown);
  };

  // Обнуление элемента в фокусе и удаление слушателей
  onunmount() {
    this.index = 0;
    document.removeEventListener('click', this.handleClickOut);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  // Закрытие списка
  close() {
    unmount(this.container, this.el);
  };

  // Фильтрания
  filter(value) {
    this.accountsItems = [...this.list
      .filter(account => account.includes(value))
      .map(this.createListElement.bind(this))];
    this.createButtonsList();

    setChildren(this.el, this.accountsItems);

    // Закрытие если список пуст
    if (!this.accountsItems.length && this.container.contains(this.el)) {
      this.close();
    };

    // Отрытие если снова не пуст
    if (this.accountsItems.length >= 1) {
      mount(this.container, this.el);
    };
  };

  // Сбор списка кнопок
  createButtonsList() {
    this.buttons = this.accountsItems.reduce((btns, btn) => {
      btns.push(btn.children[0]);
      return btns;
    }, []);
  };

  // Создание самого списка
  createListElement(account) {
    return (
      <li class='form-transfer__dropdown-item'>
        <button class='form-transfer__dropdown-btn' onclick={this.handleClick}>{account}</button>
      </li>
    )
  };

  // Навигация кнопками
  handleKeyDown = e => {
    // Если нажаты стрелки, что бы страница не прокручивалась
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
    };
    // активный элемент
    this.index = this.buttons.indexOf(document.activeElement);

    switch (e.key) {
      case 'ArrowDown':
        this.index++;
        if (this.index > this.buttons.length - 1) {
          break;
        };
        this.buttons[this.index].focus();
        break;
      case 'ArrowUp':
        this.index--;
        if (this.index < 0) {
          this.target.focus();
          break;
        };
        this.buttons[this.index].focus();
        break;
      default:
        break;
    };
  };

  // Закрытие при клике вне
  handleClickOut = e => {
    if (!this.el.contains(e.target) && e.target != this.target) {
      this.close()
    };
  };
};
