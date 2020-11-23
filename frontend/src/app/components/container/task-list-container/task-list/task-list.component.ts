import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks;
  filteredTasks;
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
    this.tasks = this.taskService.getTasks();
    this.filteredTasks = this.tasks;
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
      newTasks = newTasks.filter(task => task.priority == this.filter.prio);
    }
    if (this.filter.status){
      newTasks = newTasks.filter(task => task.status == this.filter.status);
    }
    if (this.filter.assignee){
      newTasks = newTasks.filter(task => task.assignee == this.filter.assignee);
    }
    this.filteredTasks = newTasks;
  }

  showTaskDetail(id:string){
    this.router.navigate(['task-detail'],  { queryParams: { id: id }, relativeTo:this.activatedRoute });
   // this.router.navigate(['dashboard']);
  }

}
