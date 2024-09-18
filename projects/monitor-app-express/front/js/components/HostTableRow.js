import { $ } from '../lib/dom';
import Hosts from '../lib/hosts';
import HostForm from './HostForm';
import * as LineChart from './LineChart';
import Storage from '../services/storage';

export function create(host) {
  const row = `
  <tr id="host-${host.id}">
    <td class="host-name">
      ${host.name}
    </td>
    <td class="host-address">
      ${host.address}
    </td>
    <td class="host-events">
      <span
        class="icon-pencil"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <iconify-icon icon="bx:edit"></iconify-icon>
      </span>
      <span class="icon-trash" data-bs-toggle="modal" data-bs-target="#modal">
        <iconify-icon icon="bx:trash"></iconify-icon>
      </span>
      <span class="icon-stopwatch">
        <iconify-icon icon="bx:stopwatch"></iconify-icon>
      </span>
      <span class="icon-loading invisible">
        <iconify-icon icon="line-md:loading-loop"></iconify-icon>
      </span>
    </td>
  </tr>
  `;

  $('.table-hosts tbody').insertAdjacentHTML('beforeend', row);

  $(`#host-${host.id} .icon-pencil`).onclick = () => {
    HostForm.setTitleForm('Atualizar Host');

    HostForm.setValues(host);

    HostForm.handleSubmit((host) => Hosts.update(host));
  };

  $(`#host-${host.id} .icon-trash`).onclick = () => {
    $(`.modal .host-name`).innerText = host.name;

    $(`.modal .remove-host-btn`).onclick = () => Hosts.remove(host);
  };

  $(`#host-${host.id} .icon-stopwatch`).onclick = async () => {
    $(`#host-${host.id} .icon-loading`).classList.remove('invisible');

    const pings = await Storage.create(`hosts/${host.id}/pings/3`);

    const times = pings.icmps.map((icmp) => icmp.time);

    LineChart.update(times);

    $(`#host-${host.id} .icon-loading`).classList.add('invisible');
  };
}

export function update({ id, name, address }) {
  $(`#host-${id} .host-name`).innerText = name;

  $(`#host-${id} .host-address`).innerText = address;
}

export function remove(id) {
  $(`#host-${id}`).remove();
}
