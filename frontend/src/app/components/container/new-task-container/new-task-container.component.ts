import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { Priority } from 'src/app/model/enum/priority.enum';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-new-task-container',
  templateUrl: './new-task-container.component.html',
  styleUrls: ['./new-task-container.component.css']
})
export class NewTaskContainerComponent implements OnInit {
  taskForm: FormGroup
  priority: string = "low"
  date: Date;

  constructor(
    public fb: FormBuilder,
    private taskService: TaskService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [],
      priority: this.priority,
      estimate: [],
      deadline: [],
      //just temporary - waiting for server fix
      client_id: 1,
      description: "description sample text"
    })
  }

  choosePriority(priority: string){
    this.priority = priority;
  }

  createNewTask(){
    this.taskService.createTask(this.taskForm.value).subscribe(
      result=>{
          this.router.navigate(['/task-list/task-detail'], { queryParams: { id: result.data.id }})
      }, error=>{
        //todo validations
      }
    )
  }
}
