import { Priority } from './enum/priority.enum';
import { Task } from './task';

export class TeamMember {
    id:number;
    name:string;
    is_project_manager:boolean;
    rank:number;
    avg_priority:Priority;
    current_tasks:Task[];
    avg_time:number

    constructor(id:number, name:string, is_project_manager:boolean, rank:number, avg_priority:Priority, current_tasks:Task[], avg_time:number){
        this.id = id;
        this.name = name;
        this.is_project_manager = is_project_manager;
        this.rank = rank;
        this.avg_priority = avg_priority;
        this.current_tasks = current_tasks;
        this.avg_time = avg_time;
    }
}