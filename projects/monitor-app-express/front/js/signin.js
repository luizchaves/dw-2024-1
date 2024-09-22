import 'bootstrap';

import { $ } from './lib/dom.js';
import API from './services/storage.js';
import Auth from './services/auth.js';
import Toast from './components/Toast';

import 'bootstrap/dist/css/bootstrap.min.css';

Toast.create('body > main');

const form = $('form');

form.onsubmit = async (event) => {
  event.preventDefault();

  const user = Object.fromEntries(new FormData(form));

  try {
    const { auth, token } = await API.create('signin', user, false);

    if (auth) {
      Auth.signin(token);
    } else {
      Toast.show('Usuário ou senha inválidos');
    }
  } catch (error) {
    Toast.show('Erro no login');
  }
};
