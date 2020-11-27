import { Priority } from './enum/priority.enum';
import { Status } from './enum/status.enum';


export class Task{
    id:number;
    title: string;
    estimate:string;
    description:string;
    status:string;
    priority:string;
    rank:number;
    deadline:string;
    created_at:string;
    updated_at:string;
    finished_at:string;
    client_id:number;
    creator:{
        "id":number;
        "name":string;
        "email":string;
        "is_project_manager": boolean,
        "created_at": string;
        "updated_at":string
    };
    assignee:{
        "id":number;
        "name":string;
        "email":string;
        "is_project_manager": boolean,
        "created_at": string;
        "updated_at":string
    };
    comments:Comment[];

    constructor(data:any){
            this.id = data.id;
            this.title = data.title;
            this.estimate = data.estimate;
            this.description = data.description;
            this.status = data.status;
            this.priority = data.priority;
            this.rank = data.rank;
            this.deadline = data.deadline;
            this.created_at = data.created_at;
            this.updated_at = data.updated_at;
            this.finished_at = data.finished_at;
            this.client_id = data.client_id;
            this.creator = data.creator;
            this.assignee = data.assignee;
            this.comments = data.comments?.map(val => new Comment(val));
    }
}