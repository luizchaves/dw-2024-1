import * as HostTableRow from '../components/HostTableRow';
import Storage from '../services/storage';

async function load() {
  const hosts = await Storage.read('hosts');

  hosts.forEach(HostTableRow.create);
}

async function create(investment) {
  delete investment.id;

  const createdInvestment = await Storage.create('hosts', investment);

  HostTableRow.create(createdInvestment);
}

async function update(investment) {
  const { id } = investment;

  const updatedInvestment = await Storage.update(`hosts/${id}`, investment);

  HostTableRow.update(updatedInvestment);
}

async function remove(investment) {
  const { id } = investment;

  await Storage.remove(`hosts/${id}`);

  HostTableRow.remove(id);
}

export default { load, create, update, remove };
