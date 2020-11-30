import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Priority } from 'src/app/model/enum/priority.enum';
import { Status } from 'src/app/model/enum/status.enum';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css']
})
export class TaskOverviewComponent implements OnInit {  
  @Input() task;
  @Input() user;

  //enums
  priority = Priority;
  status = Status;
  
  isDescriptionEditMode: boolean;
  public descritionGroup;

  constructor(
    public formBuilder: FormBuilder,
    private taskService: TaskService
    ) { }

  ngOnInit(): void {
    this.descritionGroup = this.formBuilder.group({
      description: this.task?.description
    });
    console.log(this.task.description)
  }

  editDescription(){
    this.isDescriptionEditMode = !this.isDescriptionEditMode ;
  }

  saveDescription(){
    
    this.taskService.updateTask(this.task.id, {"description": this.descritionGroup.value.description} ).subscribe(
      result=>{
          this.task.description = result.data.description;
          this.isDescriptionEditMode = false;
      },
      error=>{
       
      }
    )
  }
}