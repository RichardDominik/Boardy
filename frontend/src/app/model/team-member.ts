import { Priority } from './enum/priority.enum';
import { Task } from './task';

export class TeamMember {
    id:number;
    name:string;
    email:string;
    is_project_manager:boolean;
    rank:number;
    avg_task_priority:string;
    avg_time:number;
    current_tasks:Task[]

    constructor(data:any){
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.is_project_manager = data.is_project_manager;
        this.rank = data.rank;
        this.avg_task_priority = data.avg_task_priority;
        this.avg_time = data.avg_time;
        this.current_tasks = data.assignedTasks?.map(val=> new Task(val))
    }
}