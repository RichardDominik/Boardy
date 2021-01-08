import { DatePipe } from '@angular/common';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Priority } from 'src/app/model/enum/priority.enum';
import { Status } from 'src/app/model/enum/status.enum';
import { Task } from 'src/app/model/task';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css']
})
export class TaskOverviewComponent implements OnInit {  
  @Input() task: Task;
  @Input() user;

  //enums
  priority = Priority;
  status = Status;
  
  isAfterDeadline: boolean
  isDescriptionEditMode: boolean;
  isDeadlineEditMode: boolean;
  isEstimateEditMode: boolean;
  public descritionGroup;
  public deadlineGroup;
  public estimateGroup;

  constructor(
    public formBuilder: FormBuilder,
    private taskService: TaskService,
     public datepipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.descritionGroup = this.formBuilder.group({
      description: this.task?.description
    });
    this.deadlineGroup = this.formBuilder.group({
      deadline: this.task?.deadline
    })
    this.estimateGroup = this.formBuilder.group({
      estimate: this.task?.estimate
    })
    this.isDeadlineValid()
  }

  editDescription(){
    this.isDescriptionEditMode = !this.isDescriptionEditMode ;
  }

  editDeadline(){
    this.isDeadlineEditMode = !this.isDeadlineEditMode
  }

  editEstimate(){
    this.isEstimateEditMode = !this.isEstimateEditMode
  }

  saveDeadline(){
    let date = this.datepipe.transform(new Date(this.deadlineGroup.value.deadline), 'dd/MM/yyyy HH:mm');
    this.taskService.updateTask(this.task.id, {"deadline": date} ).subscribe(
      result=>{
          this.task.deadline = this.datepipe.transform(new Date(result.data.deadline), 'yyyy-MM-dd');
          this.isDeadlineEditMode = false;
          this.isDeadlineValid()
          console.log(this.task.deadline)
      },
    )
  }

  saveDescription(){
    
    this.taskService.updateTask(this.task.id, {"description": this.descritionGroup.value.description} ).subscribe(
      result=>{
          this.task.description = result.data.description;
          this.isDescriptionEditMode = false;
      },
    )
  }

  saveEstimate(){
    this.taskService.updateTask(this.task.id, {"estimate": this.estimateGroup.value.estimate} ).subscribe(
      result=>{
          this.task.estimate = result.data.estimate;
          this.isEstimateEditMode = false;
      },
    )
  }

  isDeadlineValid(){
    this.isAfterDeadline = new Date(this.task.deadline).getTime() < new Date().getTime() 
  }
}