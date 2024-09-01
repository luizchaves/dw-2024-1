import { $ } from '../lib/dom';
import Hosts from '../lib/hosts';

export function setValues({ id, name, address }) {
  const form = $('form');

  form.id.value = id;

  form.name.value = name;

  form.address.value = address;
}

export function getValues() {
  const form = $('form');

  const host = Object.fromEntries(new FormData(form));

  return host;
}

export function setTitleForm(title) {
  $('.offcanvas-title').innerText = title;
}

export function create() {
  const form = `
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="offcanvasRight"
    aria-labelledby="offcanvasRightLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasRightLabel"></h5>
      <button
        type="button"
        id="close-offcanvas"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <form>
        <input
          type="hidden"
          id="id"
          name="id"
        >
        <div class="mb-3">
          <label for="name" class="form-label">Nome</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            placeholder="Google Search"
          />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Endereço</label>
          <input
            type="text"
            class="form-control"
            id="address"
            name="address"
            placeholder="www.google.com"
          />
        </div>
        <div>
          <button
            type="submit"
            class="btn btn-secondary"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  </div>
  `;

  $('body > .container').insertAdjacentHTML('afterend', form);

  $('.create-host-event').onclick = () => {
    const form = $('form');

    setTitleForm('Cadastro de Host');

    form.reset();

    handleSubmit(Hosts.create);
  };
}

function handleSubmit(callback) {
  const form = $('form');

  form.onsubmit = async (event) => {
    event.preventDefault();

    const host = getValues();

    callback(host);

    form.reset();
  };
}

export default { setValues, getValues, setTitleForm, create, handleSubmit };
