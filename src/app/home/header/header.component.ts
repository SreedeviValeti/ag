import { PermissionService } from './../../services/auth/permission.service';
import { UtilService } from './../../services/util.service';
import { LoggerService } from './../../services/logger.service';
import { NotificationService } from './../../services/notification.service';
import { AuthenticationService } from './../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment.prod';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  //host:{'(document:click)': 'onClick($event)'},
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: any;
  showUser = false;
  userName = "";
  loginUrl = "login";
  currentUrl = '';
  @Output()
  showLoader = new EventEmitter<boolean>();
  showNoti = false;
  showDDL = false;
  originalNotif = [];
  notifications = [];
  selectedNotification = null;
  showApproveDenyPopup = false;
  access = false;
  module = 'notifications';
  envName = 'notifications'
  closeResult: string = ''

  constructor(public router: Router,
    private toastr: ToastrService,
    private notifService: NotificationService,
    private loggerService: LoggerService,
    private utilService: UtilService,
    private permService: PermissionService,
    private authService: AuthenticationService, 
    private _eref: ElementRef,
    private refreshService: RefreshService,
    private modalService: NgbModal) {

    this.permService.getLoggedOutObservable().subscribe(res => {
      if (res) {
        this.doLogOut();
      }
    })
  }

  ngOnInit() {
    
    this.access = this.authService.hasGrants();
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.userName = this.currentUser["userdetails"]["name"];
    setInterval(this.getNotifications.bind(this), 300000);
    this.notifService.getNotif().subscribe(data => {
      setTimeout(() => {
        this.getNotifications();
      }, 5000)
    })
  }

  getNotifications() {
    this.notifService.getNotifications().subscribe((data: any) => {
      this.originalNotif = data.notifications;
      this.notifications = JSON.parse(JSON.stringify(this.originalNotif));
    })
  }  

  onNotifClick(notification) {
    this.selectedNotification = notification;
    this.showApproveDenyPopup = true;
  }
  closeNotif() {
    this.selectedNotification = null;
    this.showApproveDenyPopup = false;
  }

  approveOrDecline(url, approve: boolean) {
    if (!this.access) {
      return;
    }

    this.showLoader.next(true);
    this.notifService.approveOrDecline(url).subscribe((response: any) => {
      let successMessage = 'Approved Success';
      if (!approve) {
        successMessage = 'Decline Success';
      }
      let correlationId = this.utilService.getCorelationId('notificationService');
      this.loggerService.log(correlationId, this.module, this.envName, successMessage, '');
      if (response && response.statusCode && (response.statusCode === 200 || response.statusCode === 302)) {
        this.toastr.success(successMessage);
      } else {
        this.toastr.error(response.errorMessage);
      }
      this.showLoader.next(false);
      this.getNotifications();
      this.closeNotif();
    }, err => {
      this.showLoader.next(false);
    });
  }

  onClickedOutside($event: Event) {
    if ($event) {
      $event.stopPropagation();
    }
    if (this.showDDL) {
      this.showDDL = false;
    } if (this.showNoti) {
      this.showNoti = false;
    }
  }

  doLogOut() {
    this.permService.logOut(this.onLogoutCallBack());
  }

  onLogoutCallBack() {
    return {
      onSuccess: (msg) => {
        this.authService.removeUser();
        this.router.navigate([this.loginUrl]);
      }, onFailure: (msg) => {
        console.log('Logout Failed ');
        console.log(msg);
      }
    };
  }

  changePwdFunctionality() {
    localStorage.setItem('previousUrl', JSON.parse(JSON.stringify(this.currentUrl)));
    this.router.navigate(["home/change-password"]);
  }
}