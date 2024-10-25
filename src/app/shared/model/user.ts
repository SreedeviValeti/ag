export class User {
    token: any = '';
    id_token: string = '';
    userdetails: string = '';
    name: any = '';
    constructor(token, id_token, userDetails, name) {
        this.id_token = id_token;
        this.token = token;
        this.userdetails = userDetails;
        this.name = name;
    }

}