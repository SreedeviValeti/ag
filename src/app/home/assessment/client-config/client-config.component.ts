import { ClientConfigViewComponent } from './client-config-view/client-config-view.component';
import { ClientConfigEditComponent } from './client-config-edit/client-config-edit.component';
import { ClientConfigCreateComponent } from './client-config-create/client-config-create.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssessmentService } from './../../../services/assessment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-config',
  templateUrl: './client-config.component.html',
  styleUrls: ['./client-config.component.scss']
})
export class ClientConfigComponent implements OnInit {


  loading = false;

  apps: any = [];

  selectedApp;


  constructor(
    private service: AssessmentService,
    private modalService: NgbModal
  /* private router: Router,
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private infraService: InfraService,
    private toastr: ToastrService,
    private actvRoute: ActivatedRoute,
    private notifService: NotificationService,
    private authService: AuthenticationService */) {
  }

  ngOnInit() {
    this.getpillarlist();
  }



  getpillarlist() {
    this.loading = true;
    this.apps = [];
    this.service.getApps().pipe().subscribe({
      next: (res) => {
        this.loading = false;
        this.apps = res;
        console.log(this.apps)
      }, error: () => {
        this.loading = false;
      }
    });

  }




  /* showEditPopup(pillar, env, $event) {
      if ($event) {
          $event.stopPropagation()
      }
      this.selectedEnv = env;
      this.openEditEnvModel(pillar, env);
  } */







  /* openEditAppModel(pillar, env) {
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
   */


  openEditAppModel(app) {
    this.selectedApp = app;
    const scope = this;
    const modalRef = this.modalService.open(ClientConfigEditComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.application = app;
    modalRef.result.then((result) => {
      console.log(result);
    }, reason => {
      console.log(reason);
    });
  }

  openviewAppModel(app) {
    this.selectedApp = app;
    const scope = this;
    const modalRef = this.modalService.open(ClientConfigViewComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.application = app;
    modalRef.result.then((result) => {
      console.log(result);
    }, reason => {
      console.log(reason);
    });
  }



  openCreateAppModel() {
    const scope = this;
    const modalRef = this.modalService.open(ClientConfigCreateComponent, {
      size: 'lg',
    });
    modalRef.result.then((result) => {
      console.log(result);

    }, reason => {
      console.log(reason);
    });
  }






}
