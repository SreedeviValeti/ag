import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { APIClientService } from 'src/app/services/api-client.service';
import { AssessmentService } from 'src/app/services/assessment.service';
import { InfraService } from 'src/app/services/infra.service';
import { environment } from 'src/environments/environment.prod';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';

@Component({
    selector: 'envdiscoverysetup',
    templateUrl: './envdiscoverysetup.component.html',
    styleUrls: ['./envdiscoverysetup.component.scss']
})

export class EnvdiscoverysetupComponent implements OnInit {
    loading = false;
    pillarList=[]
    environmentDetails:any
    pillars:any
    selectedPillar:any;
    selectedEnvType:any
    envLoading
    logretention:any
    application_log_retention
    migrationBaseUrl = localStorage.getItem('migrationbaseurl');;
    envdiscoverypillar = `${this.migrationBaseUrl}peoplesoft/pillars`;
    logManagemnturl = `${this.migrationBaseUrl}peoplesoft/log-retention`;
    constructor( private infraService: InfraService, private service: AssessmentService,private formBuilder: FormBuilder
        ){}

    ngOnInit() {
        this.getpillarlist()
        this.logretention = this.formBuilder.group({
          application_log_retention:['', [Validators.required]],
      });
    }

    getpillarlist() {
        const payload = {
            "account": environment.account,
            "region":environment.region
          }
        this.loading = true;
        this.infraService.getenvdiscoverypillarlist(this.envdiscoverypillar,payload).subscribe(
            data => {
                this.loading = false;
                this.pillars = this.pillarsFormat(data['pillar_list']);
            },
            err => {
                this.loading = false;
            });
    }

    pillarsFormat(pillars) {
        this.pillarList = [];
        for( var pillars of pillars){
            this.pillarList.push(
                {
                    envList: [],
                    expand: false,
                    envsLoaded: false,
                    name: pillars,
                    envType :[{'0':'PROD'},{'1':'NONPROD'}]
                }
            )
        }
    }

    expandOrcollapse(pillar, $event) {
        this.selectedPillar = pillar.name.toLowerCase();
        if ($event) {
            $event.stopPropagation()
        }
        if (pillar.expand) {
            pillar.expand = false;
        } else {
            pillar.expand = true;
            if (!pillar.dataLoaded) {            
                this.getEnvironments(pillar)
            }
        }
    }
    
    getEnvironments(pillar) {
        pillar.envLoading = true;
        if(this.selectedPillar){
            const payload = {  "source": "aws.apigateway",
              "pillar": this.selectedPillar, 
             "environment_type": this.selectedEnvType,
            "path" : "environment-discovery",
            "account":environment.account,
            "region":environment.region}
            this.service.getEnv(payload).subscribe(
                 res=> {
                    pillar.envLoading = false;
                    pillar.environmentDetails = res
                    console.log(res)
                    localStorage.setItem('environments',JSON.stringify(res))
                    pillar.envsLoaded = true;
                }, error => {
                    pillar.loading = false
                });
            }
    }
   
    prod($event) {
        this.selectedEnvType = (event.target as HTMLInputElement).value
        localStorage.setItem("envty",this.selectedEnvType)
    }

      save(){
        const payload = {   "envtype": this.selectedEnvType, 
        "retention_days":this.application_log_retention,
        "account":environment.account,
        "region":environment.region}
        this.infraService.logsmanagement(payload,this.logManagemnturl).pipe().subscribe({
            next: (res) => {
              console.log(res.toString)
            }, error: () => {
                console.log(Error)
            }
          });
      }  
}
