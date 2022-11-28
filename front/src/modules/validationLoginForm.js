function removeClass(event) {
  event.target.classList.remove('error', 'success');
};

export default function validLoginForm(form) {
  const login = form.elements[1];
  const password = form.elements[2];
  const loginErrors = [];
  const passwordErrors = [];

  login.classList.remove('error', 'success');
  password.classList.remove('error', 'success');
  login.removeEventListener('input', removeClass);
  password.removeEventListener('input', removeClass);

  login.addEventListener('input', removeClass);
  password.addEventListener('input', removeClass);

  if (login.value.trim() === '') {
    console.log('login empty');
    loginErrors.push('login empty');
  }

  if (login.value.trim() !== '' && /\s/.test(login.value)) {
    console.log('space in login');
    loginErrors.push('space in login');
  };

  if (login.value.trim() !== '' && login.value.trim().replace(/\s/g, '').length <= 5) {
    console.log('shorty login')
    loginErrors.push('shorty login');
  }

  if (password.value.trim() === '') {
    console.log('password empty');
    passwordErrors.push('password empty');
  }

  if (password.value.trim() !== '' && /\s/.test(password.value)) {
    console.log('space in password');
    passwordErrors.push('space in password');
  };

  if (password.value.trim() !== '' && password.value.trim().replace(/\s/g, '').length <= 5) {
    console.log('shorty password')
    passwordErrors.push('shorty password');
  }

  if (loginErrors.length || passwordErrors.length) {
    if (loginErrors.length) {
      login.classList.add('error')
    } else {
      login.classList.add('success')
    }

    if (passwordErrors.length) {
      password.classList.add('error')
    } else {
      password.classList.add('success')
    }

    return false;
  } else {
    return {
      login: login.value,
      password: password.value
    };
  }
}
