import Component from '@glimmer/component';
import {action} from '@ember/object';
import {formatPostTime} from 'ghost-admin/helpers/gh-format-post-time';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';
import {task} from 'ember-concurrency';
export default class GhReportsListItemComponent extends Component {
  @service feature;
  @service session;
  @service settings;
  @service store

  @tracked isHovered = false;
  @tracked isDeleted = false;
  @action
  mouseOver() {
      this.isHovered = true;
  }

  @action
  mouseLeave() {
      this.isHovered = false;
  }
  @task(function* () {
      alert(1);
  })
      approveTask;

  @task(function* () {
      let {report} = this.args;
      report.destroyRecord()
      if(!report.isDeleted)
      {
        alert("delete error")
      }
      else{
        alert("succesfully")
        this.isDeleted = true;
      }
  })
      declineTask;
}
