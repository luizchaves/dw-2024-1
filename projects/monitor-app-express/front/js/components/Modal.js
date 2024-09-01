import { $ } from '../lib/dom';

function create() {
  const modal = `
  <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalLabel">Remover host</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Deseja remover o host <span class="host-name fw-bold"></span>?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" class="btn btn-primary remove-host-btn" data-bs-dismiss="modal">Confirmar</button>
      </div>
    </div>
  </div>
</div>
  `;

  $('body > .container').insertAdjacentHTML('afterend', modal);
}

export default { create };
