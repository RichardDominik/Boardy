import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from 'src/app/model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) {
   }

   getTasks():Observable<any>{
     return this.http.get<any>('http://notabot.duckdns.org:32768/api/tasks');
   }

   getAllTasks():Observable<any>{
    return this.http.get<any>('http://notabot.duckdns.org:32768/api/all-tasks-without-parent');
  }

   getTaskById(id:string):Observable<any>{
     return this.http.get<any>('http://notabot.duckdns.org:32768/api/tasks/'+id);
   }

   updateTask(task_id:number, body:any){
    return this.http.post<any>('http://notabot.duckdns.org:32768/api/tasks/'+task_id, body);
   }

   createTask(task:any){
    return this.http.post<any>('http://notabot.duckdns.org:32768/api/tasks', task);
   }

   getPage(url: string){
    return this.http.get<any>(url);
   }

   filterTask(filter:any){
     return this.http.get('http://notabot.duckdns.org:32768/api/tasks', {params: filter})
   }
}
