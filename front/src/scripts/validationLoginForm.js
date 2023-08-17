import { setAttr } from "redom";

function removeClass({ target }) {
  setAttr(target, {
    ariaInvalid: '',
  });
  target.classList.remove('success');
};

export default function validLoginForm(login, password) {
  const loginErrors = [];
  const passwordErrors = [];

  login.classList.remove('success');
  password.classList.remove('success');
  login.removeEventListener('input', removeClass);
  password.removeEventListener('input', removeClass);

  login.addEventListener('input', removeClass);
  password.addEventListener('input', removeClass);

  if (login.value.trim() === '') {
    loginErrors.push('Логин пустой');
  }

  if (/\s/.test(login.value.trim())) {
    loginErrors.push('Пробелы в логине');
  };

  if (login.value.trim().replace(/\s/g, '').length <= 5 && login.value.trim().replace(/\s/g, '').length > 1) {
    loginErrors.push('Логин короткий');
  }

  if (password.value.trim() === '') {
    passwordErrors.push('Пароль пустой');
  }

  if (password.value.trim() !== '' && /\s/.test(password.value)) {
    passwordErrors.push('Пробелы в пароле');
  };

  if (password.value.trim() !== '' && password.value.trim().replace(/\s/g, '').length <= 5) {
    passwordErrors.push('Короткий пароль');
  }

  if (loginErrors.length || passwordErrors.length) {
    if (loginErrors.length) {
      setAttr(login, {
        ariaInvalid: 'true'
      });
    } else {
      login.classList.add('success');
    };

    if (passwordErrors.length) {
      setAttr(password, {
        ariaInvalid: 'true'
      });
    } else {
      password.classList.add('success')
    }
    return {
      login: {
        errors: loginErrors
      },
      password: {
        errors: passwordErrors
      }
    };
  } else {
    return {
      login: login.value,
      password: password.value
    };
  }
}
