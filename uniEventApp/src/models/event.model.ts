


export class Event {

    public id: number = -1;
    public address: string = "";
    public date: Date= new Date();
    public date_creation: Date = new Date();
    public description: string="";
    public image: string="";
    public price: number=0;
    public title: string="";
    public views: number=0;


    constructor(obj?: any) {
        this.set(obj);
    }

    set(obj?: any) {
        if (obj) {
            this.id = (typeof obj.id === "number") ? obj.id : this.id;
            this.address = obj.address || this.address;
            this.description = obj.description || this.description;
            this.image = obj.image || this.image;
            this.price = (typeof obj.price === "number") ? obj.price : this.price;
            this.title = obj.title || this.title;
            this.views = (typeof obj.views === "number") ? obj.views : this.views;
            this.date = obj.date || this.date;
            this.date_creation = obj.date_creation || this.date_creation;

            //data e data creazione da inserire

        }
    }

}
