import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { InfraService } from 'src/app/services/infra.service';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'metrics-app',
  templateUrl: './metrics-app.component.html',
  styleUrls: ['./metrics-app.component.scss']
})
export class MetricsAppComponent implements OnInit {

  selectedEnv = '';
  pillarId = '';
  envs = [];
  metricsUrl = environment.inframetrics
  inframetricurl:any
  /*  
      {
        displayName: 'Prod',
        value: 'Prod'
      },
      {
        displayName: 'Non-Prod',
        value: 'NonProd'
      }
     */

  loading = false;
  iframeUrls: any[];
  iframeSafeUrls: any[];
  metricsData = [];
  selectedServer = [];
  selectedNetwork = { data: [] };
  selectedServerName = '';
  selectedNetworkName = '';

  constructor(private actvRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private infraService: InfraService) {

  }

  ngOnInit() {
    this.inframetricurl = this.sanitizer.bypassSecurityTrustResourceUrl(this.metricsUrl);

    // this.actvRoute.params.subscribe(
    //   params => {
    //     this.pillarId = params["pillarId"];
    //     this.iframeUrls = [];
    //     this.iframeSafeUrls = [];
    //     if (this.pillarId) {

    //       this.getInfraData();
    //     }
    //   });
    //   this.getInfraData();

  }
  // onEnvChange($event, value) {
  //   this.metricsData = value;
  //   if (this.metricsData.length > 0) {
  //     this.ngShowNetwork(this.metricsData[0])
  //   }
  // }


  // setMetricsData(data) {
  //   let metricsData = [];
  //   var func_scope = this;

  //   data.forEach(function (element, i) {
  //     var networkData = {
  //       name: "",
  //       data: []
  //     }
  //     networkData["name"] = Object.keys(element)[0];
  //     var servrData = Object.values(element);
  //     servrData.forEach(d => {
  //       (Object.values(d)).forEach(function (d1, j) {
  //         var serverData = {
  //           serverName: "",
  //           urlData: []
  //         };
  //         serverData["serverName"] = Object.keys(d1)[0];
  //         Object.values(d1).forEach(d2 => {
  //           Object.values(d2).forEach(function (d3, k) {
  //             serverData.urlData[k] = func_scope.sanitizer.bypassSecurityTrustResourceUrl(d3);
  //           });
  //         });
  //         networkData.data[j] = serverData;
  //       });
  //     });
  //     metricsData[i] = networkData;
  //   });

  //   return metricsData;
  // }
  // formatData(data) {

  //   const envs = [];
  //   Object.keys(data).forEach(environment => {

  //     let env = {
  //       name: environment,
  //       value: this.setMetricsData(data[environment]),

  //     }
  //     envs.push(env);
  //   });
  //   this.envs = envs;
  //   if (this.envs.length > 0) {

  //     this.selectedEnv = this.envs[0].name;
  //     this.metricsData = this.envs[0].value
  //     if (this.metricsData.length > 0) {
  //       this.ngShowNetwork(this.metricsData[0])
  //     }
  //   }


  // }
  // sanitizeURL(url) {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }

  // ngShowNetwork(network) {
  //   this.selectedNetwork = network;
  //   this.selectedNetworkName = network.name;
  //   this.selectedServer = [];
  //   if (network.data.length > 0) {
  //     this.showServer(network.data[0]);
  //     /*  this.selectedServer = network.data[0].urlData;
  //      this.selectedServerName = network.data[0].serverName */
  //   }
  // }

  // showServer(server) {
  //   this.selectedServer = server.urlData;
  //   this.selectedServerName = server.serverName;
  // }

  // getInfraData() {

  //   this.metricsData = [];
  //   this.loading = true;
  //   this.infraService.getInfraMetrics(this.pillarId).subscribe(res => {
  //     this.formatData(res);
  //     this.loading = false;
  //   }, err => {
  //     this.loading = false;
  //   })
  // }

}
