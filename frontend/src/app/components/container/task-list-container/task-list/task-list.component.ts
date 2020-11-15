import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() tasks;
  filteredTasks;
  showFilter = false;
  filter= {
    prio: "",
    status: "",
    assignee: ""
  };

  constructor() { }

  ngOnInit(): void {
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

}
