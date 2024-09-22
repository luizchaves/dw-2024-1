import { Toast } from 'bootstrap';

import { $ } from '../lib/dom';

function create(selector) {
  const toast = `
  <div class="position-absolute top-0 end-0 p-1" style="z-index: 11">
    <div
      id="liveToast"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-delay="4000"
    >
      <div class="toast-header">
        <strong class="me-auto"></strong>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="toast"
          aria-label="Close"
        ></button>
      </div>
    </div>
  </div>
  `;

  $(selector).classList.add('position-relative');

  $(selector).insertAdjacentHTML('beforeend', toast);
}

function show(message) {
  $('.toast-header strong').innerText = message;

  const toast = new Toast($('#liveToast'));

  toast.show();
}

export default { create, show };
