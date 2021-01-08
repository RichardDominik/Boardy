import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { Priority } from 'src/app/model/enum/priority.enum';
import { Status } from 'src/app/model/enum/status.enum';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.css']
})
export class SubtaskListComponent implements OnInit {
  @Input() task: Task;
  priority = Priority;
  status = Status;
  parent: Task;
  
  constructor(
    public router:Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    if (this.task.parent_id) {
      this.taskService.getTaskById(""+this.task.parent_id).subscribe(
        result=>{
          this.parent = new Task(result.data)
        }
      );
    }
  }

  showTaskDetail(id:string){
    this.redirectTo(id);
  }

  redirectTo(id:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['task-list', 'task-detail'],  { queryParams: { id: id }}));
  }

  onScroll(event) {
    event.target.getElementsByTagName("thead")[0].scrollLeft = event.target.scrollLeft;
  }

}
