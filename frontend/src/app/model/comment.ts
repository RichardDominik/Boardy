export class Comment {
    id:number;
    rank:number;
    comment:string;
    user : {
        "id":number;
        "name":string
    }

    constructor(data:any){
        this.id = data.id;
        this.rank = data.rank;
        this.comment = data.comment;
        this.user.id = data.user.id;
        this.user.name = data.user.name;
    }
}