import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority } from 'src/app/model/enum/priority.enum';
import { Status } from 'src/app/model/enum/status.enum';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/shared/services/task.service';

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
  
  tasks:Task[];
  filteredTasks:Task[];
  showFilter = false;
  filter= {
    prio: "",
    status: "",
    assignee: ""
  };

  constructor(
    public router:Router,
    public activatedRoute: ActivatedRoute,
    public taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      result=>{
       this.mapData(result)
      }
    );
  }

  mapData(result:any) {
    this.tasks = result.data.map(val=> new Task(val))
    this.filteredTasks = this.tasks;
    this.filterTasks();

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
    switch(target.id) {
      case "task-filter-prio":
        this.filter.prio = target.value;
        break;
      case "task-filter-status":
        this.filter.status = target.value;
        break;
      case "task-filter-assignee":
        this.filter.assignee = target.value;
    }
    this.filterTasks();
  }

  filterTasks() {
    let newTasks = this.tasks;
    if (this.filter.prio){
      newTasks = newTasks.filter(task => Priority[task.priority] == this.filter.prio);
    }
    if (this.filter.status){
      newTasks = newTasks.filter(task => Status[task.status] == this.filter.status);
    }
    if (this.filter.assignee){
      newTasks = newTasks.filter(task => task.assignee.id.toString() == this.filter.assignee);
    }
    this.filteredTasks = newTasks;
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
