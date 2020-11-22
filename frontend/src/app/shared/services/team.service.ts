import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  team = [
    {
      id: 1,
      name: "Tom Cruise",
      rank: 4,
      average_priority: "NORMAL",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 1,
      name: "Will Smith",
      rank: 4,
      average_priority: "HIGH",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 1,
      name: "Prad Pitt",
      rank: 4,
      average_priority: "LOW",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 1,
      name: "Johnny Depp",
      rank: 4,
      average_priority: "NORMAL",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 1,
      name: "Drew Barrymore",
      rank: 4,
      average_priority: "NORMAL",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 1,
      name: "Penelope Cruz",
      rank: 4,
      average_priority: "HIGH",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 1,
      name: "Tom Hanks",
      rank: 4,
      average_priority: "NORMAL",
      average_time: "5h 45m",
      current_tasks: 5
    },
    {
      id: 1,
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
}
