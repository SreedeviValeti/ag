import { UtilService } from './../../../../services/util.service';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CronOptions, CronGenComponent } from 'ngx-cron-editor';

@Component({
  selector: 'schedule-model',
  templateUrl: './sechedule-edit-model.component.html',
  styleUrls: ['./sechedule-edit-model.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleEditModelComponent {

  public cronExpression = '0 0 1 ? * SAT *';
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
    hideYearlyTab: false,
    hideAdvancedTab: false,
    hideSpecificWeekDayTab: false,
    hideSpecificMonthWeekTab: false,
    use24HourTime: true,
    hideSeconds: true,

    cronFlavor: 'quartz'
  };


  @ViewChild('cronEditorDemo', { static: false })
  cronEditorDemo: CronGenComponent;

  cronForm: FormControl = new FormControl();

  scheduleEditObj;

  heading = 'Schedule Policy';

  validating = false;


  constructor(public activeModal: NgbActiveModal,
    private utilService: UtilService,
    private toastr: ToastrService
  ) {
    this.cronForm.setValue(this.cronExpression);

  }

  cronFlavorChange() {

  }


  invokeCmp() {
    if (this.scheduleEditObj && Object.keys(this.scheduleEditObj).length > 0) {

      if (this.scheduleEditObj.cronExp) {
        this.cronExpression = this.utilService.clone(this.scheduleEditObj.cronExp);
        this.cronForm.setValue(this.cronExpression);
      }
    }
  }


  resetCron() {
    this.scheduleEditObj.cronExp = this.cronExpression;
    this.cronForm.setValue(this.cronExpression);
  }
  applyCron() {
    this.scheduleEditObj.cronExp = this.cronForm.value;
  }




  validateForm() {
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
    } else {
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
