import 'bootstrap';

import { $ } from './lib/dom.js';
import API from './services/storage.js';
import Toast from './components/Toast';

import 'bootstrap/dist/css/bootstrap.min.css';

Toast.create('body > main');

const form = $('form');

form.onsubmit = async (event) => {
  event.preventDefault();

  if (form.checkValidity()) {
    const user = Object.fromEntries(new FormData(form));

    try {
      const { email, message } = await API.create('/users', user, false);

      if (email) {
        location.href = '/signin.html';
      } else if (message === 'Email already in use') {
        setInputValidity('email', 'Email já cadastrado.');

        form.classList.add('was-validated');
      } else {
        Toast.show('Erro no cadastro');
      }
    } catch (error) {
      Toast.show('Erro no cadastro');
    }
  } else {
    form.classList.add('was-validated');
  }
};

[form.name, form.email, form.password].map((input) => {
  input.addEventListener('input', () => {
    input.setCustomValidity('');

    form.classList.remove('was-validated');
  });
});

form.confirmationPassword.addEventListener('input', () => {
  const password = form.password.value;

  const confirmationPassword = form.confirmationPassword.value;

  if (password !== confirmationPassword) {
    setInputValidity('confirmationPassword', 'As senhas não são iguais.');
  } else {
    form.confirmationPassword.setCustomValidity('');

    form.classList.remove('was-validated');
  }
});

function setInputValidity(input, message) {
  $(`#${input} + .invalid-feedback`).textContent = message;

  form[input].setCustomValidity(message);
}
