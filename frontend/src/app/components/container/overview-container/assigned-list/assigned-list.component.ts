import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Priority } from 'src/app/model/enum/priority.enum';
import { Status } from 'src/app/model/enum/status.enum';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/shared/services/task.service';
import { User, UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-assigned-list',
  templateUrl: './assigned-list.component.html',
  styleUrls: ['./assigned-list.component.css']
})
export class AssignedListComponent implements OnInit {
  priority = Priority;
  status = Status;
  pagination = {
    prev: "",
    next: ""
  }
  
  tasks:Task[];
  user:User;
  filteredTasks:Task[];
  showFilter = false;
  filter= {
    prio: "",
    status: "",
    assignee: "",
    title: ""
  };

  constructor(
    public router:Router,
    public taskService: TaskService,
    public userService: UserService,
    public titleService: Title
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      result=>{
       this.user = result;
       this.filterTasks();
      }
    );
    
   
  }

  mapData(result:any) {
    this.tasks = result.data.map(val=> new Task(val))
    this.filteredTasks = this.tasks;   
    
    let filter = (this.filter.prio? "&priority[]="+this.filter.prio : "")+
      (this.filter.status? "&status[]="+this.filter.status : "")+
      ("&assignee[]="+this.user.id)+
      ("&title="+this.filter.title);
    this.pagination.prev = result.links.prev ? result.links.prev+filter : result.links.prev;
    this.pagination.next = result.links.next ? result.links.next+filter : result.links.next;
  }

  showHideFilter() {
    if (this.showFilter) {
      this.showFilter = false;
      return;
    }
    this.showFilter = true;
  }

  onCustomFilter(value) {
    this.filter.status = value
    this.filterTasks()
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
      case "task-filter-title":
          if(this.filter.title != target.value){
            wasChange = true;
          }
          this.filter.title = target.value;
    }
    if(wasChange){
      this.filterTasks();
    }
  }

  filterTasks() {
    
    let filter = {
      "priority[]": (this.filter.prio &&  this.filter.prio!="" ? this.filter.prio:undefined),
      "status[]": (this.filter.status &&  this.filter.status!="" ? this.filter.status:undefined),
      "assignee[]": this.user.id,
      "title": (this.filter.title &&  this.filter.title!="" ? this.filter.title:undefined)
    }

    this.taskService.filterTask(JSON.parse(JSON.stringify(filter))).subscribe(
      result=>{
        this.mapData(result)
      }
    )
  }

  showTaskDetail(id:string){
    this.router.navigate(['task-list', 'task-detail'],  { queryParams: { id: id }});
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

  onScroll(event) {
    event.target.getElementsByTagName("thead")[0].scrollLeft = event.target.scrollLeft;
  }

}
