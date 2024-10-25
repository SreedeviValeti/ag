import { NotificationService } from './../../services/notification.service';
import { ROLES } from './../../shared/constants/adminstration-constants';
import { environment } from './../../../environments/environment.prod';
import { MenuService } from './../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { AuthenticationService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})

export class SideBarComponent implements OnInit {

  migrationBaseUrl = localStorage.getItem('migrationbaseurl')
  pillarUrl = `${this.migrationBaseUrl}peoplesoft/pillars`;
  menuItemsLoaded = false;
  originalMenuItesm = [
    {
      path: 'dashboard', staticMenuItems: true, active: false, show: false, ROLES: [],
      displayName: 'Dashboard', iconUrl: 'assets/images/dashboard.png', subMenuItems: [],
    },
    {
      path: 'migration', ROLES: [], staticMenuItems: true, active: false, show: false, displayName: 'Build', iconUrl: 'assets/images/infra-metrics.png',
      subMenuItems: [
        { path: 'migration/apply-os-patching', displayName: 'OS Patching', active: false, iconUrl: '', },
        { path: 'migration/application-build', displayName: 'Application Build', active: false, iconUrl: '', },
        { path: 'migration/Download-Oracle-Patch', displayName: 'Download Oracle Patch', active: false, iconUrl: '', },
        { path: 'migration/install-app-home', displayName: 'Install APP Home', active: false, iconUrl: '', },
        { path: 'migration/install-ps-home', displayName: 'Install PS Home', active: false, iconUrl: '', },
        { path: 'migration/create-PS-AMI', active: false, displayName: 'Create PS AMI' ,iconUrl: ''},
        { path: 'migration/status-board', displayName: 'Status Board', active: false, iconUrl: '', },
        { path: 'migration/peoplesoft-inventory', displayName: 'Peoplesoft Inventory', active: false, iconUrl: '', },
        { path: 'migration/environment-clone', displayName: 'Environment Clone', active: false, iconUrl: '', },
      ]
    },
    // { path: 'pillarConfig', ROLES: [ROLES.ADMIN_GROUP, ROLES.ERPA_ADMIN_GROUP], staticMenuItems: true, active: false, show: false, displayName: 'Configuration', iconUrl: 'assets/images/infra-metrics.png', subMenuItems: [] },
    {
      path: 'environmentdiscovery', ROLES: [], staticMenuItems: true, active: false, show: true, displayName: 'Operations', iconUrl: 'assets/images/infra-metrics.png',
      subMenuItems: [
      ]
    },
    // {
    //   path: 'administration',ROLES: [], staticMenuItems: false, active: false, show: false, displayName: 'Administration', iconUrl: 'assets/images/admin.png',
    //   url: this.pillarUrl, subMenuItems: [
    //   ]
    // },
    {
      path: 'inframetrics', ROLES: [], staticMenuItems: true, active: false, show: true, displayName: 'Infrastructure Metrics', iconUrl: 'assets/images/infra-metrics.png',
      subMenuItems: [
      ]
    },
    { path: 'analytics', ROLES: [], staticMenuItems: true, active: false, show: false, displayName: 'Application Metrics', iconUrl: 'assets/images/analytics.png', subMenuItems: [] },
    { path: 'securityhub', ROLES: [], staticMenuItems: true, active: false, show: false, displayName: 'Security HUB', iconUrl: 'assets/images/analytics.png', subMenuItems: [] },
    { path: 'servicenow', ROLES: [], staticMenuItems: true, active: false, show: false, displayName: 'Service Requests', iconUrl: 'assets/images/servicenow.png', subMenuItems: [] },
    { path: 'assessment', ROLES: [], staticMenuItems: true, active: false, show: false, displayName: 'Assessment', iconUrl: 'assets/images/assessment.png', 
    subMenuItems: [
    ] 
    },
    { path: 'inviteusers', ROLES: [], staticMenuItems: true, active: false, show: false, displayName: 'User Management', iconUrl: 'assets/images/invite-user.png', subMenuItems: [] },
    { path: 'about', ROLES: [], staticMenuItems: true, active: false, show: false, displayName: 'About', iconUrl: 'assets/images/analytics.png', subMenuItems: [] },
  ];

  menuItems = [];
  activeUrl = '';
  homePage = '/home';

  constructor(private router: Router,
    private authService: AuthenticationService,
    private notifService: NotificationService,
    private menuService: MenuService) {
    this.registerRouterEventListener();
    this.processMenuItems();

  }

  ngOnInit() {
    this.notifService.getPillarCreateNotif().subscribe(data => {
      this.processMenuItems();
    })
  }

  hasAccess(menu) {
    let accessible = true;
    if (menu.ROLES && menu.ROLES.length > 0) {
      accessible = this.authService.hasRoles(menu.ROLES);
    }
    return accessible;
  }

  processMenuItems() {
    this.menuItems = this.originalMenuItesm.filter(menuItem => {
      return this.authService.hasRoles(menuItem.ROLES) || menuItem.ROLES.length === 0;
    });
    const scope = this;
    let observables = [];
    let objMap = [];
    this.menuItems.forEach(menuItem => {
      if (!menuItem.staticMenuItems) {
        objMap.push(menuItem);
        observables.push(this.menuService.submenuItems(menuItem.url).pipe(map(data => {
          return data;
        }, err => { return []; })));
      }
    });
    forkJoin(observables).subscribe(data => {
      for (let index = 0; index < data.length; index++) {
        const menuItem = objMap[index];
        switch (menuItem.path) {
          case 'pillarConfig':
            break;
          case 'inframetrics':
          case 'administration':
            this.loadAdminSubItems(data[index], menuItem);
            break;
        }
      }
      this.menuItemsLoaded = true;
      if (this.activeUrl) {
        this.activateMenu(this.activeUrl);
      }
    });
  }

  loadAdminSubItems(data, menuItem) {
    let obj = menuItem.subMenuObj;
    const subMenuItems = [];
    if (data && data.pillars.length > 0) {

      data.pillars.forEach(pillar => {
        subMenuItems.push(
          {
            path: `${menuItem.path}/${pillar.pillarID}`,
            displayName: pillar.pillarName,
            active: false, iconUrl: '',
            id: pillar.pillarID
          }
        );
      });
      //Dynamic add sub menu
      // subMenuItems.push( {path: 'administration/AMI-Info',
      // displayName: 'Create PeopleSoft AMI',
      // iconUrl: ''
      // })
      // subMenuItems.push( {path: 'administration/Download-Oracle-Patch',
      // displayName: 'Download Oracle Patch',
      // iconUrl: ''
      // })

      menuItem.subMenuItems = subMenuItems;

    }
  }

  // loadsubMenuItems(menuItem) {
  //    this.menuService.submenuItems(menuItem.url).subscribe((res: any) => {
  //      if (menuItem.path === 'administrationNew') {
  //        this.loadAdminSubItems(res, menuItem);
  //      }
  //    });
  //  } 

  showHideSubMenu(event, menu) {
    menu.show = !menu.show;
    event.stopPropagation();
  }

  registerRouterEventListener() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.activeUrl = event.urlAfterRedirects;
      if (this.homePage === this.activeUrl) {
        this.router.navigateByUrl(`${this.homePage}/${this.menuItems[0].path}`);
      } else {
        this.activateMenu(this.activeUrl);
      }
    });
    this.router.events.pipe(
      filter(event => event instanceof NavigationCancel)
    ).subscribe((event: NavigationCancel) => {
      this.activateMenu(this.activeUrl);
    });
  }

  activateMenu(activeUrl: any): void {
    if (!this.menuItemsLoaded) {
      return;
    }
    let url = activeUrl || '';
    url = activeUrl.split('/').filter(c => c);
    this.resetMainMenu();
    this.menuItems.forEach((menu: any) => {
      const parentUrl = url[1];
      if (menu.path.indexOf(parentUrl) !== -1) {
        const isAccessible = this.hasAccess(menu);
        if (!isAccessible) {
          console.log('No Access');
          return;
        }
        menu.active = true;
        menu.show = true;
        if (menu.subMenuItems.length > 0) {
          if (url[2]) {
            menu.subMenuItems.forEach((subMenu: any) => {
              if (url[2] && subMenu.path === `${url[1]}/${url[2]}`) {
                subMenu.active = true;
              }
            });
          } else {
            this.router.navigateByUrl(`${activeUrl}/${menu.subMenuItems[0].id}`);
          }
        }
      }
    });
  }

  resetMainMenu() {
    this.menuItems.forEach((menu: any) => {
      menu.active = false;
      (menu.subMenuItems || []).forEach((subMenu: any) => {
        subMenu.active = false;
      });
    });
  }
  // setActiveItem(activeItem: any, dontNavigate: boolean) {
  //   if (!dontNavigate) {
  //     this.router.navigateByUrl(activeItem.navigate);
  //   }
  // }
}