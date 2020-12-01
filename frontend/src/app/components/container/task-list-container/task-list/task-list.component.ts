import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { stringify } from 'querystring';
import { Priority } from 'src/app/model/enum/priority.enum';
import { Status } from 'src/app/model/enum/status.enum';
import { Task } from 'src/app/model/task';
import { TeamMember } from 'src/app/model/team-member';
import { TaskService } from 'src/app/shared/services/task.service';
import { TeamService } from 'src/app/shared/services/team.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  priority = Priority;
  status = Status;
  pagination = {
    prev: "",
    next: ""
  }
  
  team:TeamMember[];
  tasks:Task[];
  filteredTasks:Task[];
  showFilter = false;
  filter= {
    prio: "",
    status: "",
    assignee: ""
  };
  selectedObject: any;

  constructor(
    public router:Router,
    public activatedRoute: ActivatedRoute,
    public taskService: TaskService,
    public teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      result=>{
       this.mapData(result)
      }
    );

    this.teamService.getTeamMembers().subscribe(
      result => {
        this.team = result.data.map(val => new TeamMember(val));
      }
    )
  }

  mapData(result:any) {
    this.tasks = result.data.map(val=> new Task(val))
    this.filteredTasks = this.tasks;

    this.pagination.prev = result.links.prev;
    this.pagination.next = result.links.next;
  }

  showHideFilter() {
    if (this.showFilter) {
      this.showFilter = false;
      return;
    }
    this.showFilter = true;
  }

  onFilter(target) {
    let wasChange = false;
    switch(target.id) {
      case "task-filter-prio":
        if(this.filter.prio != target.value){
          wasChange = true;
        }
        this.filter.prio = target.value;
        break;
      case "task-filter-status":
        if(this.filter.status != target.value){
          wasChange = true;
        }
        this.filter.status = target.value;
        break;
      case "task-filter-assignee":
        if(this.filter.assignee != target.value){
          wasChange = true;
        }
        this.filter.assignee = target.value;
    }
    if(wasChange){
      this.filterTasks();
    }
  }

  filterTasks() {
    
    let filter = {
      "priority[]": (this.filter.prio &&  this.filter.prio!="" ? this.filter.prio:undefined),
      "status[]": (this.filter.status &&  this.filter.status!="" ? this.filter.status:undefined),
      "assignee[]": (this.filter.assignee &&  this.filter.assignee!="" ? this.filter.assignee:undefined),

    }

    this.taskService.filterTask(JSON.parse(JSON.stringify(filter))).subscribe(
      result=>{
        this.mapData(result)
      }
    )
  }

  showTaskDetail(id:string){
    this.router.navigate(['task-detail'],  { queryParams: { id: id }, relativeTo:this.activatedRoute });
  }

  addTask(){
    this.router.navigate(['new-task'], {relativeTo:this.activatedRoute });
  }

  prevPage(){
    this.taskService.getPage(this.pagination.prev).subscribe(
      result=>{
        this.mapData(result);
      }
    )
  }

  nextPage(){
    this.taskService.getPage(this.pagination.next).subscribe(
      result=>{
        this.mapData(result);
      }
    )
  }

}
