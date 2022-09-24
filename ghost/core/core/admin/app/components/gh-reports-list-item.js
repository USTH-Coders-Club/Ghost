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
  @service ajax;


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

  saveReportUrl(){
    let {report} = this.args;
    try{
    let url = this.store.createRecord('reporturl',{
      id:report.id,
      report_link : report.report_link,
      type: report.type,
      created_date: report.created_date,
    });
      url.save();
      this.notifications.showAlert("Succesfully add report url",{dalayed:true,type: 'success'});
      return true
    }catch(error){
      this.notifications.showAlert("Failed to add report url",{dalayed:true,type: 'error'});
      return false;
      }
  }
  UpdateUser(){
    let {report} = this.args;
    let user = this.store.queryRecord('userscore',{filter:'email:'+report.email}).then(function(user) {
     let userid = user.get('id');
    let score = user.get('score') + 1;
      user.set('score',score)
      user.save()
    }).catch(function(error){
    return undefined
});
}
  createUser(){
    let {report} = this.args;
    let newuser = this.store.createRecord('userscore',{
      email : report.email,
      score: 0
    });
      newuser.save();
  }


  @task(function* () {
      let {report} = this.args;
      try{
        this.saveReportUrl();
          timeout(1000) }
          catch(error){
            console.log(error)
          } finally{
            yield report.destroyRecord();
            yield timeout(1000)
            this.isExisted = false;
            if(this.UpdateUser() == undefined){
             timeout(1000)
             this.createUser();
          }
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
