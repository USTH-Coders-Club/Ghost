import ModalComponent from 'ghost-admin/components/modal-base';
import {alias, reads} from '@ember/object/computed';
import {computed} from '@ember/object';
import {inject as service} from '@ember/service';
import {task,timeout} from 'ember-concurrency';

export default ModalComponent.extend({
    store: service(),
    notifications: service(),


    // Allowed actions
    confirm: () => {},

    report: alias('model'),
    actions: {
        confirm() {
            this.deleteReport.perform();
        }
    },

    deleteReport: task(function* () {
        try {
            yield this.confirm();
        } finally {
            this.send('closeModal');
              }
    }).drop()
});
