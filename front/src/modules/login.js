import { el, setAttr } from "redom";
import WorkApi from '../scripts/WorkApi';
import router from '../router/router'
import validLoginForm from "../scripts/validationLoginForm";
import Toast from "../scripts/toast";

export default class Login {
  constructor() {
    <form this='el' class='login' onsubmit={this.submit}>
      <fieldest this='field' class='login__field'>
        <legend class='main-title login__leg'>Вход в аккаунт</legend>
        <div class='login__grp'>
          <label class='login_lbl' for='login'>Логин</label>
          <input this='loginEl' name='login' id='login' data-test='login' class='inp login__inp' />
          <span this='loginErrorEl' class='error'></span>
        </div>
        <div class='login__grp'>
          <label class='login_lbl' for='password'>Пароль</label>
          <input this='passwordEl' name='password' type='password' id='password' data-test='password' class='inp login__inp' />
          <span this='passwordErrorEl' class='error'></span>
        </div>
        <button this='btnSubmit' type='submit' data-test='submit' class='btn btn-primary btn-s login__btn'>Войти</button>
      </fieldest>
    </form>
  };

  error(fieldName, error) {
    const field = {
      log: this.loginErrorEl,
      pas: this.passwordErrorEl,
    };

    setAttr(field[fieldName].previousSibling, {
      ariaInvalid: 'true'
    });
    if (error instanceof Array) {
      field[fieldName].textContent = error.length ? error.reduce((str, currentError) => `${str}, ${currentError}`) : '';
    } else {
      field[fieldName].textContent = error;
    };
  };

  submit = async e => {
    e.preventDefault();
    this.loginErrorEl.textContent = '';
    this.passwordErrorEl.textContent = '';
    const { login, password } = validLoginForm(this.loginEl, this.passwordEl);

    if (login.errors || password.errors) {
      this.error('log', login.errors);
      this.error('pas', password.errors);
      return;
    };

    if (login && password) {
      setAttr(this.btnSubmit, {
        disabled: true
      });

      try {
        const { payload, error } = await WorkApi.autorization(login, password);

        if (error) {
          throw new Error(error)
        };

        const date = new Date(Date.now() + 86400e3);
        document.cookie = `auth=${payload.token}; expires=${date}`;
        router.navigate('/accounts');

      } catch ({ message }) {
        switch (message) {
          case 'No such user':
            this.error('log', 'Нет такого пользователя');
            break;
          case 'Invalid password':
            this.error('pas', 'Неправильный пароль');
            break;
          case 'Failed to fetch':
            new Toast({
              title: 'Упс, что-то пошло не так',
              text: 'Не удалось получить ответ от сервера',
              theme: 'danger',
              autohide: true,
              interval: 10000,
            });
            break;
          default:
            throw new Error(message);
        };
      } finally {
        setAttr(this.btnSubmit, {
          disabled: false
        });
      };
    };
  };
};
