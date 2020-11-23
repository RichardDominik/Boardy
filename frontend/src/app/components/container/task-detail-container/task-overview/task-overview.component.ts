import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css']
})
export class TaskOverviewComponent implements OnInit {

  @Input() task;

  constructor() { }

  ngOnInit(): void {
  }
}