import { PermissionService } from 'src/app/services/auth/permission.service';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './services/auth/auth.service';
import { ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from './services/notification.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title = 'angular-idle-timeout';
  public modalRef: BsModalRef;
  @ViewChild('childModal', { static: false }) childModal: ModalDirective;
  agdomain = environment.agdomain
  restapiid = environment.restapiid
  region = environment.region
  stage = environment.stage
  migrationurl = `https://${environment.apigw_domain}/`

  ngOnInit() {
    localStorage.setItem("migrationbaseurl",this.migrationurl)
  }

  constructor(private idle: Idle, private keepalive: Keepalive,
    private modalService: BsModalService,
    private authService: AuthenticationService,
    private router: Router,
    private notificationService:NotificationService,
    private permService: PermissionService) {

    const idleTime = 30 * 60;
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(idleTime);
    // sets a timet period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(60);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.childModal.hide();
      this.idleState = 'Timed out!';
      this.timedOut = true;
      console.log(this.idleState);
      // this.logout();
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
    // this.logout();
    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);
    keepalive.onPing.subscribe(() => this.lastPing = new Date());
    if (!this.permService.tokenExpired()) {
      idle.watch()
    } else {
      idle.stop();
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      if (url.indexOf('home') != -1) {
        if (this.permService.getUserName() && !this.permService.tokenExpired() ) {
          idle.watch();
        }else{
          this.logout();
        }
       
      } else {
        this.timedOut = false;
        this.childModal.hide();
        idle.stop();
      }
    });

  }

  reset() {
    this.idle.watch();
    this.timedOut = false;
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  logout() {
    this.childModal.hide();
    this.permService.triggerLogout(true);
  }
}