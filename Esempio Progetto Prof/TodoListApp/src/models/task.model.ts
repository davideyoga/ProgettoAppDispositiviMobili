


export class Task {
    
    public id: number = -1;
    public text: string = "";
    public completed: boolean = false;
    public position: number = 0;
    
    constructor(obj?: any) {
        this.set(obj);
    }
    
    set(obj?: any) {
        if (obj) {
            this.id = (typeof obj.id === "number") ? obj.id : this.id;
            this.text = obj.text || this.text;
            this.completed = (typeof obj.completed === 'boolean') ? obj.completed : this.completed;
            this.position = (typeof obj.position === "number") ? obj.position : this.position;
        }
    }
    
}