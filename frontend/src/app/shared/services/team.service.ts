import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  team = [
    {
      id: 1,
      name: "Bruce Willis",
      rank: 4,
      average_priority: "NORMAL",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 2,
      name: "Will Smith",
      rank: 4,
      average_priority: "HIGH",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 3,
      name: "Prad Pitt",
      rank: 4,
      average_priority: "LOW",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 4,
      name: "Johnny Depp",
      rank: 4,
      average_priority: "NORMAL",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 5,
      name: "Drew Barrymore",
      rank: 4,
      average_priority: "NORMAL",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 6,
      name: "Penelope Cruz",
      rank: 4,
      average_priority: "HIGH",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 7,
      name: "Tom Hanks",
      rank: 4,
      average_priority: "NORMAL",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 8,
      name: "Tom Hardy",
      rank: 4,
      average_priority: "LOW",
      average_time: "5h 45m",
      current_tasks: 5
    }
  ]

  constructor() { }

  getTeamMembers(){
    return this.team;
  }

  getMemberById(id){
    for(var person of this.team){
      if(person.id == id){
        return person;
      }
    }
    return null;
  }
}
