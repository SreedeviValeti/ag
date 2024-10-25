export interface STEP {
    step: number,
    expectedTime: string,
    instanceID: string,
    new: STEP,
    isNew: boolean,
    edit: STEP,
    validInstance: boolean,
    os: string,
    scriptExecution: string,
    status: string
    stepDescription: string
}

export const stepObj: STEP = {
    "step": 0,
    "expectedTime": "",
    "new": null,
    isNew: false,
    edit: null,
    validInstance: false,
    "instanceID": "",
    "os": "",
    "scriptExecution": "",
    "status": "",
    "stepDescription": ""
}

export const OSs = ["linux", "windows"];
export const envtype = ["nprd", "prod"];
export const adhocValues = ['PIA Maintenance','----------------------------','bounce','clearcache','ipcclean','rolling-bounce','rolling-bounce-clearcache','start','stop', '','Down Time','----------------------------','stop-environment','start-environment','','Monitoring','----------------------------','url-healthcheck','','Backups','---------------------------','RDS-Backups']
export const shedulepsValues = ['PIA Maintenance','---------------------------------------------','bounce','clearcache','ipcclean','rolling-bounce','rolling-bounce-clearcache','start','stop','','Down Time','---------------------------------------------','stop-environment','start-environment','','Database Refresh','---------------------------------------------',
'autoscaling-instance-refresh','refresh','','Resource Scaling','---------------------------------------------','schedule-scaling','weblogic-usercount','','Monitoring','---------------------------------------------','pia-status-check','url-healthcheck',]
export const installOption = ["create_psami_linux","create_psami_windows"]
export const cobollicenvalues = ['compiler','runtime','temporary']
export const SaaSValue= ["true", "false"];
export const applicationValue= ["peoplesoft","Banner","Colleague","e-biz"];
export const extension= ["true", "false"];
export const unicode= ["yes", "no"];
export const LOADCACHESTEPS = 'loadCacheSteps';
export const REFRESHSTEPS = 'refreshSteps';
export const amivalues= ["windows","oraclelinux","redhatlinux","oraclelinux-psoft","redhatlinux-psoft","windows-psoft"];
export const scripts= ["powershell-scripts","shell-scripts","sql-scripts"];

export const ROLES = {
    ADMIN_GROUP: 'Administrators',
    ERPA_ADMIN_GROUP: 'ERPAAdmins'
}
export const domain ={
    erpadomain: 'erpa.com'
}
