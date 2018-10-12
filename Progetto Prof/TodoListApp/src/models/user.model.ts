


export class User {
    
    username: string = "";
    email: string = "";
    firstname: string = "";
    lastname: string = "";
    
    token: string = "";
    
    constructor(obj?: any) {
        this.setObj(obj);
    }
    
    setObj(obj?: any) {
        if (obj) {
            this.username = obj.username || this.username;
            this.email = obj.email || this.email;
            this.firstname = obj.firstname || this.firstname;
            this.lastname = obj.lastname || this.lastname;
            this.token = obj.token || this.token;
        }
    }
    
}