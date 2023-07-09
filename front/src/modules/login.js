import { el, setAttr } from "redom";
import WorkApi from '../modules/WorkApi';
import router from '../router/router'
import validLoginForm from "../scripts/validationLoginForm";

export default class Login {
  constructor() {
    <form this='el' class='login'>
      <fieldest this='field' class='login__field'>
        <legend class='main-title login__leg'>Вход в аккаунт</legend>
        <div class='login__grp'>
          <label class='login_lbl' for='login'>Логин</label>
          <input this='loginEl' name='login' id='login' class='inp login__inp' />
          <span this='loginErrorEl' class='error'></span>
        </div>
        <div class='login__grp'>
          <label class='login_lbl' for='password'>Пароль</label>
          <input this='passwordEl' name='password' type='password' id='password' class='inp login__inp' />
          <span this='passwordErrorEl' class='error'></span>
        </div>
        <button onclick={this.submit} this='btnSubmit' type='submit' class='btn btn-primary btn-s login__btn'>Войти</button>
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

  submit = e => {
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

      WorkApi.autorization(login, password).then(({ payload, error }) => {
        try {
          if (error) throw new Error(error);
          localStorage.setItem('token', payload.token)
          router.navigate('/accounts');
        } catch ({ message }) {
          switch (message) {
            case 'No such user':
              this.error('log', 'Нет такого пользователя');
              break;
            case 'Invalid password':
              this.error('pas', 'Неправильный пароль');
              break;
          }
        } finally {
          setAttr(this.btnSubmit, {
            disabled: false
          });
        };
      });
    };
  };
};
