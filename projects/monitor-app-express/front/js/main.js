import 'bootstrap';
import 'iconify-icon';

import HostForm from './components/HostForm';
import Modal from './components/Modal';
import Hosts from './lib/hosts';

import 'bootstrap/dist/css/bootstrap.css';

import '../css/style.css';

Hosts.load();

HostForm.create();

Modal.create();
