import { InfraService } from '../../../../services/infra.service';
import { EnvironmentService } from '../../../../services/environment.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'pillar-model',
  templateUrl: './pillar-model.component.html',
  styleUrls: ['./pillar-model.component.scss']
})
export class PillarModelComponent /* implements OnChanges  */ {

  @Input() pillar;

  create = true;
  loading = false;
  pillarName;
  statusMsg = '';

  constructor(public activeModal: NgbActiveModal,
    private infraService: InfraService,
    private toastr: ToastrService,
    private envService: EnvironmentService) { }




  /*   ngOnChanges() {
      if (this.pillar) {
        this.pillarName = this.pillar.name;
        this.create = false;
      }
    } */
  validatePillar() {

  }

  dismiss() {
    this.activeModal.dismiss(true);
  }

  updatePillar() {
    // this need an api to update pillar;
    this.activeModal.dismiss(true);
  }

  createPillar() {
    this.loading = true;
    this.statusMsg = 'validating Pillar..'
    this.infraService.getpillarlist().subscribe(
      data => {
        this.statusMsg = ''
        const pillars = data['pillars'].map(pillar => pillar.pillarName);
        if (pillars.indexOf(this.pillarName) === -1) {
          this.statusMsg = 'Creating Pillar..'
          this.infraService.createPillar(this.pillarName).subscribe(res => {
            this.loading = false;
            this.activeModal.close(true);
          }
          );
        } else {
          this.toastr.warning(`pillar ${this.pillarName} already created`);
          this.loading = false;
        }
      },
      err => {
        this.toastr.error('something wen t wrong');
      });
  }
}
