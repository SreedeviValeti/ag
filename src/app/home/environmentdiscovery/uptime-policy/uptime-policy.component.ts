import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UtilService } from 'src/app/services/util.service';
import { CronOptions, CronGenComponent } from 'ngx-cron-editor';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation, Output } from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';
import { environment } from 'src/environments/environment.prod';
import { PsactivityStatusComponent } from '../psactivity-status/psactivity-status.component';

@Component({
    selector: 'uptime-policy',
    templateUrl: './uptime-policy.component.html',
    styleUrls: ['./uptime-policy.component.scss']
})

export class UptimePolicyComponent {
  public cronExpression = '0 1 ? * SAT *';
  public isCronDisabled = false;
  public cronOptions: CronOptions = {
    formInputClass: 'form-control cron-editor-input',
    formSelectClass: 'form-control cron-editor-select',
    formRadioClass: 'cron-editor-radio',
    formCheckboxClass: 'cron-editor-checkbox',
    defaultTime: '00:00:00',
    hideMinutesTab: true,
    hideHourlyTab: true,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: false,
    hideYearlyTab: true,
    hideAdvancedTab: true,
    hideSpecificWeekDayTab: true  ,
    hideSpecificMonthWeekTab: true,
    use24HourTime: true,
    hideSeconds: true,
    cronFlavor: 'quartz'
  };
  @ViewChild('cronEditorDemo', { static: true })
  cronEditorDemo: CronGenComponent;
  @Input()
  options: CronOptions
  removeValue :FormArray
  @Input() psvalue
  @Input() pstype
  migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
  dburl = `${this.migrationBaseUrl}peoplesoft/schedule-activities`
  schedulevalue
  state;
  loading = false;
  @ViewChild("component1",{ static: true }) component1: PsactivityStatusComponent;
  testform: FormControl = new FormControl();
  scheduleEditObj = {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    cronExp: '0 1 ? * SAT *',
    enabled: false
  };
  heading = 'Schedule Policy';
  validating = false;
  scheduledateform = new FormGroup({
    schedulestartdate: new FormControl('', Validators.required),
    schedulestarttime: new FormControl('', Validators.required),
    scheduleenddate: new FormControl('', Validators.required),
    scheduleendtime: new FormControl('', Validators.required),
  });
  
  constructor(private formBuilder: FormBuilder,private refreshService: RefreshService,public activeModal: NgbActiveModal,
    private utilService: UtilService,
    private toastr: ToastrService
  ) 
  {}

  ngOnInit(){
    this.scheduledateform = this.formBuilder.group({
      schedulestartdate: ['', Validators.required],
      schedulestarttime: ['', Validators.required],
      scheduleenddate: ['', Validators.required],
      scheduleendtime: ['', Validators.required],
    });
  }

  invokeCmp(event) {
    this.schedulevalue = document.getElementsByClassName("mat-tab-label mat-ripple ng-star-inserted mat-tab-label-active")[0].textContent
    if(this.schedulevalue == 'Daily'){
      this.schedulevalue = 'daily'
    }
    else if(this.schedulevalue == 'Monthly'){
      this.schedulevalue = 'monthly'
    }
    else{
      this.schedulevalue = 'weekly'
    }
    if (this.scheduleEditObj && Object.keys(this.scheduleEditObj).length > 0) {
      if (this.scheduleEditObj.cronExp) {
        this.cronExpression = this.utilService.clone(this.scheduleEditObj.cronExp);
        console.log(this.cronExpression)
        this.testform.setValue(this.cronExpression);
        this.removeValue = this.testform.value
        console.log(this.testform)
      }
    }
  }
    
  resetCron() {
    this.scheduleEditObj.cronExp = this.cronExpression;
    this.testform.setValue(this.cronExpression);
  }

  applyCron() {
    this.loading = true;
    var scheduledate = this.scheduledateform
    console.log(scheduledate.value,this.testform.value)
    localStorage.setItem("scheduledatetime", JSON.stringify(scheduledate.value,this.testform.value))
    console.log(localStorage.getItem("actionenv"))
    const envname = JSON.parse(localStorage.getItem("actionenv"))
    console.log(envname)
    const env = envname["envname"]
    const action = envname["action"]
    const version = envname["version"]
    var cronvalue = this.testform.value.slice(1).trim()
    console.log(this.testform.value)
    if(this.scheduleEditObj.enabled == true){
      this.state = 'enabled'
    }
    else{
      this.state = 'disabled'
    }
    if(action == 'stop-environment' || action == 'start-environment'){
      const payload = {
        "envname": env,
          "cron_expression": `cron(${cronvalue})`,
        "action": action,
        "schedule":this.schedulevalue,
        "state":this.state,
        "account":environment.account,
        "region":environment.region
      };
      this.refreshService.databaseInfo(this.dburl,payload,).subscribe(res => {
        console.log(res)
        if(res['statuscode'] === 200){
          this.loading = false
          this.component1.scheduleevents();
          this.toastr.success(res['body'])
        }
        else if(res['statuscode'] === 403){
          this.toastr.error(res['errorMessage'])
        }
        else{
          this.toastr.error(res['errorMessage'])
        }
      })
    }
    else if(action == 'loadcache'){
      const payload = {
        "envname": env,
        "cron_expression": `cron(${cronvalue})`,
        "action": action,
        "schedule":this.schedulevalue,
        "state":this.state,
        "account":environment.account,
        "region":environment.region
      };
      console.log(payload)
      this.refreshService.databaseInfo(this.dburl,payload,).subscribe(res => {
        if(res['statuscode'] === 200){
          this.loading = false
          this.toastr.success(res['body'])
        }
        else if(res['statuscode'] === 403){
          this.toastr.error(res['errorMessage'])
        }
        else{
          this.toastr.error(res['errorMessage'])
        }
        console.log(res)
      })
  }
  else if(action == 'refresh'){
    const payload = {
      "envname": env,
      "cron_expression": `cron(${cronvalue})`,
      "action": action,
      "schedule":this.schedulevalue,
      "state":this.state,
      "account":environment.account,
      "region":environment.region
    };
    console.log(payload)
    this.refreshService.databaseInfo(this.dburl,payload,).subscribe(res => {
      if(res['statuscode'] === 200){
        this.loading = false
        this.toastr.success(res['body'])
      }
      else if(res['statuscode'] === 403){
        this.toastr.error(res['errorMessage'])
      }
      else{
        this.toastr.error(res['errorMessage'])
      }
      console.log(res)
      })
  }

  else if(action == 'autoscaling-instance-refresh'){
    const payload = {
      "envname": env,
      "cron_expression": `cron(${cronvalue})`,
      "action": action,
      "version": version,
      "account":environment.account,
      "region":environment.region
    };
    console.log(payload)
      this.refreshService.databaseInfo(this.dburl,payload,).subscribe(res => {
      if(res['statuscode'] === 200){
        this.loading = false
        this.toastr.success(res['body'])
      }
      else if(res['statuscode'] === 403){
        this.toastr.error(res['errorMessage'])
      }
      else{
        this.toastr.error(res['errorMessage'])
        }
        console.log(res)
      })
  }
  
  else{
    const payload = {
      "envname": env,
      "cron_expression": `cron(${cronvalue})`,
      "action": action,
      "schedule":this.schedulevalue,
      "pia_components":JSON.parse(localStorage.getItem("piacomponents")),
      "state":this.state,
      "account":environment.account,
      "region":environment.region
    };
    console.log(payload)
    this.refreshService.databaseInfo(this.dburl,payload,).subscribe(res => {
      if(res['statuscode'] === 200){
        this.loading = false
        this.toastr.success(res['body'])
      }
      else if(res['statuscode'] === 403){
        this.toastr.error(res['errorMessage'])
      }
      else{
        this.toastr.error(res['errorMessage'])
        }
      console.log(res)
    })
  } 
    this.activeModal.close(true);
  }
  
  validateForm() {
    var scheduledate = this.scheduledateform
    console.log(scheduledate)
    let isValid = true;
    const startDate = this.scheduleEditObj.startDate;
    const endDate = this.scheduleEditObj.endDate;
    const startTime = this.scheduleEditObj.startTime ? this.scheduleEditObj.startTime : '00:00';
    const endTime = this.scheduleEditObj.endTime ? this.scheduleEditObj.endTime : '00:00';;
    const sDateString = `${startDate}T${startTime}:00Z`;
    const eDateString = `${endDate}T${endTime}:00Z`;
    if (startDate && endDate) {
      this.scheduleEditObj.startTime = startTime;
      this.scheduleEditObj.endTime =  endTime;
      const sDate = new Date(sDateString).getTime();
      const eDate = new Date(eDateString).getTime();
      isValid = eDate > sDate;
    }
    if (isValid) {
      this.save();
    } 
    else {
      this.toastr.error('Please enter valid dates');
    }
  }
    
  dismiss() {
    this.activeModal.dismiss(true);
  }
    
  updateStep() {
    this.activeModal.close(true);
  }

  save() {
    this.activeModal.close(true);
  }   
}