import Component from '@glimmer/component';
import ShortcutsMixin from 'ghost-admin/mixins/shortcuts';
import {action} from '@ember/object';
import {formatPostTime} from 'ghost-admin/helpers/gh-format-post-time';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import {task,timeout} from 'ember-concurrency';
import config from 'ghost-admin/config/environment';
//require('dotenv/config');
export default class GhReportsListItemComponent extends Component{
  @service feature;
  @service session;
  @service settings;
  @service store;
  @service notifications;
  @service utils;
  @service config;
  @service ajax;


  @tracked defaultType = true;
  @tracked type = null;
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

  pushToPublicDb(){
    let {report} = this.args
    const response =  this.ajax.post("http://222.255.214.9:5000/v2/approve-report", {
        data: JSON.stringify({
    "ghostadmin_key": config.ghostadmin_key,
    "email": report.email,
    "report_link": report.report_link,
    "type": report.type}),
        processData: false,
        contentType: 'application/json'
    });
    return response
//
// "ghostadmin_key": process.env.GHOSTADMIN_KEY,
// "email": report.email,
// "report_link": report.report_link,
// "type": report.type
  }
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
      if(error){
        console.log(error)
        return undefined }
});
}
  createUser(){
    let {report} = this.args;
    let newuser = this.store.createRecord('userscore',{
      email : report.email,
      score: 1
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
            setTimeout(this.createUser(),2000);
          }
          this.pushToPublicDb().then((response) =>{
            if (response.status == 202){
                console(response.message)}
            else{
              console.log(response.message)
            }
          });
        }
  })
      approveTask;

      @task(function* () {
            let {report} = this.args;
            try{
            yield report.destroyRecord()
            yield timeout(1000)
            this.isExisted = false;
            this.notifications.showAlert("Succesfully delete report",{dalayed:true,type: 'success'});
            return true;
          } catch(error){
            this.notifications.showAlert("Fail to delete report ",{dalayed:true,type: 'error'});
          }
        })
      deleteReport;
      @action
      toggleScamProperties(){
          let report = this.args;
          let report_sample = this.store.findRecord('report',report.id).then(function(report_sample) {
           report_sample.type='scam';
           report_sample.save();
         }).catch(function(error){
              console.log(error)
      })
      this.defaultType=false;
      this.type='scam';
      }
      @action
      togglePhishingProperties(){
          let {report} = this.args;
          let report_sample = this.store.findRecord('report',report.id).then(function(report_sample) {
           report_sample.type='phishing';
           report_sample.save();
         }).catch(function(error){
              console.log(error)
      })
          this.defaultType=false;
          this.type='phishing';
      }
      @action
      toggleImpersonateFakeProperties(){
          let {report} = this.args;
          let report_sample = this.store.findRecord('report',report.id).then(function(report_sample) {
           report_sample.type='impersonate_fake';
           report_sample.save();
         }).catch(function(error){
              console.log(error)
      })
          this.defaultType=false;
          this.type='impersonate_fake';
      }
      @action
      toggleBadSensitiveContentProperties(){
          let {report} = this.args;
          let report_sample = this.store.findRecord('report',report.id).then(function(report_sample) {
           report_sample.type='bad_sensitive_content';
           report_sample.save();
         }).catch(function(error){
              console.log(error)
      })
          this.defaultType=false;
          this.type='bad_sensitive_content';
      }
      @action
      toggleDangerousLinkProperties(){
          let {report} = this.args;
          let report_sample = this.store.findRecord('report',report.id).then(function(report_sample) {
           report_sample.type='dangerous_link';
           report_sample.save();
         }).catch(function(error){
              console.log(error)
      })
          this.defaultType=false;
          this.type='dangerous_link';
      }
      @action
      toggleOtherProperties(){
          let {report} = this.args;
          let report_sample = this.store.findRecord('report',report.id).then(function(report_sample) {
           report_sample.type='other';
           report_sample.save();
         }).catch(function(error){
              console.log(error)
      })
          this.defaultType=false;
          this.type='other';
      }
}
