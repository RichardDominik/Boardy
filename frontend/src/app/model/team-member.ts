import { Priority } from './enum/priority.enum';
import { Task } from './task';

export class TeamMember {
    id:number;
    name:string;
    email:string;
    is_project_manager:boolean;
    rank:number;
    avg_task_priority:string;
    avg_time:string;
    current_tasks:Task[]
    numberOfAssignedTasks: number

    constructor(data:any){
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.is_project_manager = data.is_project_manager;
        this.rank = data.rank;
        this.avg_task_priority = data.avg_task_priority;
        let time = data.avg_time?.split(" ");
        this.avg_time = data.avg_time ? time[0]+time[1]+" "+time[2]+time[3] : data.avg_time;
        this.current_tasks = data.assignedTasks?.map(val=> new Task(val))
        this.numberOfAssignedTasks = data.numberOfAssignedTasks
    }
}