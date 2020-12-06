import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
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
  @ViewChild('priorityField') priorityField: ElementRef
  taskForm: FormGroup
  priority: string
  date: Date;
  isDateFormated: boolean;

  constructor(
    public fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    public datepipe: DatePipe,
    public titleService: Title
    ) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: [],
      priority: [],
      estimate: [],
      deadline: [],
    })
    this.titleService.setTitle("New task")
  }

  choosePriority(priority: string){
    this.priority = priority;
    this.taskForm.reset(
      {
        priority:priority,
        title: this.taskForm.value.title,
        estimate: this.taskForm.value.estimate,
        deadline: this.taskForm.value.deadline
      })
  }

  createNewTask(){
    if (!this.isDateFormated){
      this.taskForm.value.deadline = this.datepipe.transform(new Date(this.taskForm.value.deadline), 'dd/MM/yyyy HH:mm');
      this.isDateFormated = true;
    }
    this.taskService.createTask(this.taskForm.value).subscribe(
      result=>{
          this.router.navigate(['/task-list/task-detail'], { queryParams: { id: result.data.id }})
      }, error=>{
        //todo validations
      }
    )
  }

  onDate(event): void {
    this.isDateFormated = false;
    console.log(this.taskForm.value)
  }
}
