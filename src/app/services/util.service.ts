import { FormGroup } from '@angular/forms';
import { Injectable } from "@angular/core";

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    getCorelationId(...args: any[]) {
        return args.join('_');
    }

 
    getCstDate(dateString) {
        let cstDateString = null;
        if (dateString) {
            const cstDate = new Date(dateString).getTime() - this.getCstOffset();
            cstDateString = `${this.getUtcYear(cstDate)}-${this.getUTCMonth(cstDate)}-${this.getUTCDate(cstDate)}T${this.getUtcHours(cstDate)}:${this.getUTCMinutes(cstDate)}:00Z`;
        }
        return cstDateString;
    }
    getCSTToGMT(dateString) {
        let gmtDateString = null;
        if (dateString) {
            const gmtDate = new Date(dateString).getTime() + this.getCstOffset();
            gmtDateString = `${this.getUtcYear(gmtDate)}-${this.getUTCMonth(gmtDate)}-${this.getUTCDate(gmtDate)}T${this.getUtcHours(gmtDate)}:${this.getUTCMinutes(gmtDate)}:00Z`;

        }
        return gmtDateString;
    }

    getUtcYear(dateString) {
        return new Date(dateString).getUTCFullYear();
    }
    getUTCMonth(dateString) {
        let month = new Date(dateString).getUTCMonth() + 1;
        return month > 9 ? month : `0${month}`;
    }
    getUTCDate(dateString) {
        let date = new Date(dateString).getUTCDate();
        return date > 9 ? date : `0${date}`;
    }
    getUtcHours(dateString) {
        let hours = new Date(dateString).getUTCHours();
        return hours > 9 ? hours : `0${hours}`;
    }
    getUTCMinutes(dateString) {
        let minutes = new Date(dateString).getUTCMinutes();
        return minutes > 9 ? minutes : `0${minutes}`;
    }

    toUTCFormat(dateString) {
        let utcdate = '';
        if (dateString) {
            utcdate = new Date(dateString).toUTCString();
        }
        return utcdate;
    }




    getCstOffset() {
        return 6 * 60 * 60 * 1000;
    }


    clone(obj) {
        if(obj){
            return JSON.parse(JSON.stringify(obj));
        }else{
            return null;
        }

    }



}