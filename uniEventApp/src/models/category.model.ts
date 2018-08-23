


export class Category {


    public name: String = "";
    public description: String = "";

    constructor(obj?: any) {
        this.set(obj);
    }

    set(obj?: any) {
        if (obj) {
            this.name = obj.address || this.name;
            this.description = obj.description || this.description;
        }
    }

}
