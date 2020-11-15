import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-list-container',
  templateUrl: './task-list-container.component.html',
  styleUrls: ['./task-list-container.component.css']
})
export class TaskListContainerComponent implements OnInit {

  tasks;

  constructor() { 
    // fake data
    this.tasks = [{
      id: 1,
      title: 'Task 1',
      description: "Lorem Ipsum...",
      estimate: 5,
      status: "IN PROGRESS",
      priority: "HIGH",
      rank: 0,
      created_at: "24.05.2019",
      updated_at: "24.05.2019",
      finished_at: "",
      client: "Fake Company s.r.o",
      creator: "Tom Cruise",
      assignee: "Bruce Willis"
    },
    {
      id: 2,
      title: 'Task 2',
      description: "Lorem Ipsum...",
      estimate: 5,
      status: "FREE",
      priority: "NORMAL",
      rank: 0,
      created_at: "24.05.2019",
      updated_at: "24.05.2019",
      finished_at: "",
      client: "Fake Company s.r.o",
      creator: "Tom Cruise",
      assignee: "Bruce Willis"
    },
    {
      id: 3,
      title: 'Task 3',
      description: "Lorem Ipsum...",
      estimate: 5,
      status: "TO TEST",
      priority: "LOW",
      rank: 0,
      created_at: "24.05.2019",
      updated_at: "24.05.2019",
      finished_at: "",
      client: "Fake Company s.r.o",
      creator: "Tom Cruise",
      assignee: "Bruce Willis"
    },
    {
      id: 4,
      title: 'Task 4',
      description: "Lorem Ipsum...",
      estimate: 5,
      status: "DONE",
      priority: "HIGH",
      rank: 0,
      created_at: "24.05.2019",
      updated_at: "24.05.2019",
      finished_at: "",
      client: "Fake Company s.r.o",
      creator: "Tom Cruise",
      assignee: "Bruce Willis"
    },
    {
      id: 5,
      title: 'Task 5',
      description: "Lorem Ipsum...",
      estimate: 5,
      status: "IN PROGRESS",
      priority: "HIGH",
      rank: 0,
      created_at: "24.05.2019",
      updated_at: "24.05.2019",
      finished_at: "",
      client: "Fake Company s.r.o",
      creator: "Tom Cruise",
      assignee: "Bruce Willis"
    },
    {
      id: 6,
      title: 'Task 6',
      description: "Lorem Ipsum...",
      estimate: 5,
      status: "FREE",
      priority: "NORMAL",
      rank: 0,
      created_at: "24.05.2019",
      updated_at: "24.05.2019",
      finished_at: "",
      client: "Fake Company s.r.o",
      creator: "Tom Cruise",
      assignee: "Bruce Willis"
    },
    {
      id: 7,
      title: 'Task 7',
      description: "Lorem Ipsum...",
      estimate: 5,
      status: "TO TEST",
      priority: "LOW",
      rank: 0,
      created_at: "24.05.2019",
      updated_at: "24.05.2019",
      finished_at: "",
      client: "Fake Company s.r.o",
      creator: "Tom Cruise",
      assignee: "Bruce Willis"
    },
    {
      id: 8,
      title: 'Task 8',
      description: "Lorem Ipsum...",
      estimate: 5,
      status: "DONE",
      priority: "HIGH",
      rank: 0,
      created_at: "24.05.2019",
      updated_at: "24.05.2019",
      finished_at: "",
      client: "Fake Company s.r.o",
      creator: "Tom Cruise",
      assignee: "Bruce Willis"
    }]
  }

  ngOnInit(): void {
  }

}
