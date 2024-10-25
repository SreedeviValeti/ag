import { Subject } from 'rxjs';
import { NotificationService } from './../../../services/notification.service';
import { EnvModelComponent } from './env-model/env-model.component';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Component, OnChanges, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InfraService } from '../../../services/infra.service';
import { PillarModelComponent } from './pillar-model/pillar-model.component';
import { AuthenticationService } from '../../../services/auth/auth.service';
import { EditEnvModelComponent } from './edit-env-model/edit-env-model.component';

@Component({
    selector: 'app-setup',
    templateUrl: './setup.component.html',
    styleUrls: ['./setup.component.scss']
})
export class SetupComponent implements OnInit {

    tabs = [
        { name: 'pillars', display: 'Pillars' },
        { name: 'users', display: 'Users' },
        { name: 'groups', display: 'Groups' }
    ];

    loading = false;

    hasEditAccess = false;

    editSPolicy = false;

    envLoading

    selectedTab;
    selectedPillar;
    selectedEnv;
    isDelPopupShow = false;
    newPillarName: string = '';
    createPillarFlag;
    pillarnames = ['HCM', "Campus Solutions"];
    pillarlist = [];


    constructor(private router: Router,
        private modalService: NgbModal,
        private config: NgbModalConfig,
        private infraService: InfraService,
        private toastr: ToastrService,
        private actvRoute: ActivatedRoute,
        private notifService: NotificationService,
        private authService: AuthenticationService) {
        this.onTabSelect(this.tabs[0]);
    }

    ngOnInit() {
        this.hasEditAccess = this.authService.isERPAAdmin();
        this.getpillarlist();
    }

    onTabSelect(tab) {
        this.selectedTab = tab;
    }
    goToHomeEnvPage() {
        console.log("goToHomeEnvPage clciked and called ");
    }
    getpillarlist() {
        this.loading = true;
        this.infraService.getpillarlist().subscribe(
            data => {
                this.pillarsFormat(data['pillars']);
                this.loading = false;
            },
            err => {
                console.log("err data is", err);
                this.loading = false;
            });
    }


    expandOrcollapse(pillar, $event) {
        if ($event) {
            $event.stopPropagation()
        }
        if (pillar.expand) {
            pillar.expand = false;
        } else {
            pillar.expand = true;
            if (!pillar.dataLoaded) {
                this.loadEnvs(pillar);
            }
        }
    }


    showEditPopup(pillar, env, $event) {
        if ($event) {
            $event.stopPropagation()
        }
        this.selectedEnv = env;
        this.openEditEnvModel(pillar, env);
    }

    deleteEnvironment() {
        this.selectedEnv.loading = true;
        this.infraService.deleteEnvironment(this.selectedEnv.envID,  this.selectedPillar.id).subscribe(res => {
            this.loadEnvs(this.selectedPillar);
            this.isDelPopupShow = false;
            this.selectedEnv.loading = false;
        }, err => {
            this.toastr.error(`${this.selectedEnv.envName} deletion failed`);
            this.selectedEnv.loading = false;
        })
    }

    showDeletePopup(pillar, env, $event) {
        if ($event) {
            $event.stopPropagation()
        }
        this.selectedPillar = pillar;
        this.selectedEnv = env;
        this.isDelPopupShow = true;

    }
    expandPillar(pillar) {

    }

    collapsePillar(pillar) {

    }

    loadEnvs(pillar) {
        pillar.envLoading = true;
        this.infraService.getEnvlistBypillarId(pillar.id)
            .subscribe(
                data => {
                    pillar.envLoading = false;
                    pillar.environmentsList = data["environments"];
                    pillar.envsLoaded = true;
                },
                err => {
                    pillar.loading = false
                }
            );
    }


    pillarsFormat(pillars) {
        this.pillarlist = [];
        pillars.forEach(pillar => {
            this.pillarlist.push(
                {
                    envList: [],
                    expand: false,
                    envsLoaded: false,
                    name: pillar.pillarName,
                    id: pillar.pillarID
                }

            )

        });
        console.log(this.pillarlist)
    }

    openEditEnvModel(pillar, env) {
        this.selectedPillar = pillar;
        const scope = this;
        const modalRef = this.modalService.open(EditEnvModelComponent, {
            size: 'md',
        });
        modalRef.componentInstance.pillarId = this.selectedPillar.id;
        modalRef.componentInstance.environment = {
            envID: this.selectedEnv.envID,
            envName: this.selectedEnv.envName,
            peopleTools: this.selectedEnv.peopleTools,
            application: this.selectedEnv.application,
            imageUpdate: this.selectedEnv.imageUpdate
        }
        this.selectedEnv;
        modalRef.result.then((result) => {
            this.loadEnvs(pillar);

        }, reason => {
            console.log(reason);
        });
    }


    openCreateEnvModel(pillar) {
        this.selectedPillar = pillar;
        const scope = this;
        const modalRef = this.modalService.open(EnvModelComponent, {
            size: 'md',
        });
        modalRef.componentInstance.pillarId = this.selectedPillar.id;
        modalRef.result.then((result) => {
            this.loadEnvs(pillar);

        }, reason => {
            console.log(reason);
        });
    }


    enablecreatePillarCard() {
        console.log(" new pillar adding button clicked");
        this.createPillarFlag = true;
    }




    createPillar() {
        const scope = this;
        const modalRef = this.modalService.open(PillarModelComponent, {
            size: 'md',
        });
        modalRef.result.then((result) => {
            this.getpillarlist();
            this.notifService.callPillarCreateNotif();
        }, reason => {
            console.log(reason);
        });
        modalRef.componentInstance.pillar = null;

    }

    addedenvinfo(e: any, text: string) {
        console.log("event value is :", e);
        console.log("event value is :", text);
        this.newPillarName = text;

    }

}
