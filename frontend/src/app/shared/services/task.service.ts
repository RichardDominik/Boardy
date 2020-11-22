import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks = [{
    id: 1,
    title: 'Task 1',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla maximus dolor a augue aliquet aliquet. Integer egestas tincidunt magna eget condimentum. Nunc luctus mi viverra sem imperdiet laoreet. Nunc sodales, lorem quis ullamcorper volutpat, justo mi euismod metus, luctus sagittis nisi magna iaculis ex. Proin sapien neque, facilisis at turpis gravida, aliquam semper nisi. Nunc congue sagittis velit et maximus. Nunc interdum ut mi a luctus.",
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
    assignee: null
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
    assignee: null
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
  }];

  constructor() {
   }

   getTasks(){
     return this.tasks;
   }

   getTaskById(id){
     console.log(id);
     for(var task of this.tasks){
       if(task.id == id){
         return task;
       }
     }
     return null;
   }
}
