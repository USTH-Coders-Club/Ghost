import Component from '@glimmer/component';
import ShortcutsMixin from 'ghost-admin/mixins/shortcuts';
import {action} from '@ember/object';
import {formatPostTime} from 'ghost-admin/helpers/gh-format-post-time';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import {task,timeout} from 'ember-concurrency';

export default class GhReportsListItemComponent extends Component{
  @service feature;
  @service session;
  @service settings;
  @service store;
  @service notifications;
  @service utils;
  @service config;


  @tracked showDeleteReportModal=false;
  @tracked isHovered = false;
  @tracked isExisted = true;
  @tracked isSaved = true;
  @action
  mouseOver() {
      this.isHovered = true;
  }
  @action
  toggleDeleteReportModalOff() {
        this.showDeleteReportModal=false;
  }
  @action
  mouseLeave() {
      this.isHovered = false;
  }
  @task(function* (){
      this.showDeleteReportModal=true;
      return true;
  })
  toggleDeleteReportModalOn;

  @task(function* () {
      let {report} = this.args;
      try{
      let url = this.store.createRecord('reporturl',{
        id:report.id,
        report_link : report.report_link,
        type: report.type,
        created_date: report.created_date,
      });
        url.save();
        yield report.destroyRecord();
        this.isExisted = false;
        this.notifications.showAlert("Succesfully add report url",{dalayed:true,type: 'success'});
        return true;
      } catch(error){
        this.notifications.showAlert("Failed to add report url",{dalayed:true,type: 'error'});

      }

  })
      approveTask;

      @task(function* () {
            let {report} = this.args;
            try{
            yield report.destroyRecord()
            yield timeout(1000)
            this.isExisted = false;
            this.notifications.showAlert("Succesfully delete report url",{dalayed:true,type: 'success'});
            return true;
          } catch(error){
            this.notifications.showAlert("Fail to add report url",{dalayed:true,type: 'error'});
          }
        })
      deleteReport;
}
