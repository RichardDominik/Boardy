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
     return this.http.get<any>('http://notabot.duckdns.org:56124/api/tasks');
   }

   getTaskById(id:string):Observable<any>{
     return this.http.get<any>('http://notabot.duckdns.org:56124/api/tasks/'+id);
   }

   updateTask(task_id:number, id:string){
    return this.http.post<any>('http://notabot.duckdns.org:56124/api/tasks/'+task_id, {"assignee_id": id});
   }

   createTask(task:any){
    return this.http.post<any>('http://notabot.duckdns.org:56124/api/tasks', task);
   }

   getPage(url: string){
    return this.http.get<any>(url);
   }
}
