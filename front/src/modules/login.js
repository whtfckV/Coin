import { el } from "redom";

export default function createLoginForm() {
  return el('form.login', el('fieldset.login__field', [
    el('legend.main-title.login__leg', 'Вход в аккаунт'),
    el('div.login__grp', [
      el('label.login__lbl', 'Логин'),
      el('input.inp.login__inp'),
    ]),
    el('div.login__grp', [
      el('label.login__lbl', 'Пароль'),
      el('input.inp.login__inp', {
        type: 'password'
      }),
    ]),
    el('button.btn.btn-primary.btn-s.login__btn', 'Войти'),
  ])
  )
};
