import Component from '@glimmer/component';
import {action} from '@ember/object';
import {formatPostTime} from 'ghost-admin/helpers/gh-format-post-time';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';
import {task,timeout} from 'ember-concurrency';
export default class GhReportsListItemComponent extends Component {
  @service feature;
  @service session;
  @service settings;
  @service store

  @tracked isHovered = false;
  @tracked isExisted = true;
  @tracked isSaved = true;
  @action
  mouseOver() {
      this.isHovered = true;
  }

  @action
  mouseLeave() {
      this.isHovered = false;
  }
  @task(function* () {
      let {report} = this.args;
      let url = this.store.createRecord('reporturl',{
        id:report.id,
        report_link : report.report_link,
        type: report.type,
        created_date: report.created_date,
      })
      if(!url.isDeleted){
        alert("succesfully add report url")
        url.save()
        yield report.destroyRecord()
        if(!report.isDeleted)
        {
          alert("delete report error ")
        }
        else{
          yield timeout(1000)
          alert("succesfully add report")
          this.isExisted = false;
        }
      }
      else{
        alert("error")
      }

  })
      approveTask;

  @task(function* () {
      let {report} = this.args;
      yield report.destroyRecord()
      if(!report.isDeleted)
      {
        alert("delete error")
      }
      else{
        yield timeout(1000)
        alert("succesfully")
        this.isExisted = false;
      }
  })
      declineTask;
}
