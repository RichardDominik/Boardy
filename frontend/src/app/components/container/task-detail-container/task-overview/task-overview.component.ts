import { Component, Input, OnInit } from '@angular/core';
import { Priority } from 'src/app/model/enum/priority.enum';
import { Status } from 'src/app/model/enum/status.enum';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css']
})
export class TaskOverviewComponent implements OnInit {

  //enums
  priority = Priority;
  status = Status;

  @Input() task;

  constructor() { }

  ngOnInit(): void {
  }
}