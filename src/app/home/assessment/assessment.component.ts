import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.scss']
})
export class AssessmentComponent implements OnInit {

  selectedTab = '';

  tabs = [
    {
      title:'Config',
      value:'config'
    },
    // {
    //   title:'Applications',
    //   value:'apps'
    // }
  ]

  constructor() { 
    this.selectedTab = this.tabs[0].title;
  }

  ngOnInit() {
  }

}
