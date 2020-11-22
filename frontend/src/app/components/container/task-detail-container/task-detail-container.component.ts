import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-task-detail-container',
  templateUrl: './task-detail-container.component.html',
  styleUrls: ['./task-detail-container.component.css']
})
export class TaskDetailContainerComponent implements OnInit {

  task;

  constructor(
    private route:ActivatedRoute,
    private taskService:TaskService
  ) { }

  ngOnInit(): void {
    let sub = this.route.queryParams.subscribe(params => {
      this.task =  this.taskService.getTaskById(params['id']);
    });
    sub.unsubscribe()
  }
}
