import { formatDate, registerLocaleData } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { Priority } from 'src/app/model/enum/priority.enum';
import { Status } from 'src/app/model/enum/status.enum';
import { Task } from 'src/app/model/task';
import { TeamMember } from 'src/app/model/team-member';
import { TaskService } from 'src/app/shared/services/task.service';
import { TeamService } from 'src/app/shared/services/team.service';
import { User, UserService } from 'src/app/shared/services/user.service';
import {FormControl} from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';



@Component({
  selector: 'app-task-detail-container',
  templateUrl: './task-detail-container.component.html',
  styleUrls: ['./task-detail-container.component.css']
})
export class TaskDetailContainerComponent implements OnInit {

  priority = Priority;
  task: Task;
  team: TeamMember[];
  currentUser: User;
  closeResult: string;
  hasSubtasks: Boolean;
  hasParent: Boolean;
  availableTasks: Task[] = []
  selectedRelation: string = "parent"
  selectedTask: Task

  myControl = new FormControl();
  filteredOptions: Observable<Task[]>;


  constructor(
    private route:ActivatedRoute,
    private taskService:TaskService,
    private teamService:TeamService,
    private userService:UserService,
    private modalService: NgbModal,
    private titleService: Title,
    public router:Router,
    public activatedRoute: ActivatedRoute
  ) { }


​
  private _filter(value: string): Task[] {
    const filterValue = value.toString().toLowerCase();
​
    let tasks = this.availableTasks.filter(it => 
       it.id!=this.task.id && it.title.toLowerCase().startsWith(filterValue));
    if (this.selectedRelation == 'parent'){
      tasks = tasks.filter(it=>
        it.subTasks == null || it.subTasks.length == 0)
    }
    return tasks
  }

  ngOnInit(): void {
    
    let sub = this.route.queryParams.subscribe(params => {
      this.taskService.getTaskById(params['id']).subscribe(
        result=>{
          this.task = new Task(result.data);
          this.titleService.setTitle(this.task.title)
          
          if (this.task.parent_id != null) {
            this.hasParent = true
          }

          if (this.task.subTasks.length == null || this.task.subTasks.length > 0){
            this.hasSubtasks = true
          }
        }
      );
    });
    sub.unsubscribe()

    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
    this.userService.getUser().subscribe(
      data=>{
        this.currentUser = data;
      }
    )

    this.teamService.getAllTeamMembers().subscribe(
      result=>{
        this.team = result.data.map(val=>new TeamMember(val))
      }
    );

    this.taskService.getAllTasks().subscribe(
      result=>{
          this.availableTasks = result.data
        }
    )
  }

  onLinkRelationChange(value){
    this.selectedRelation = value
  }

  onTaskSelected(event){
    this.selectedTask = event.option.value
  }

 displayProperty(value) {
    if (value) {
      return value.title;
    }
  }

  linkTask(){
    if (this.selectedRelation == "parent"){
      this.taskService.updateTask(this.selectedTask.id, {"parent_id": this.task.id}).subscribe(
        result=>{
          this.taskService.getTaskById(this.task.id+"").subscribe(
            result =>{
              this.task = new Task(result.data)
            }
          )
        }
      )
    } else {
      this.taskService.updateTask(this.task.id, {"parent_id": this.selectedTask.id}).subscribe(
        result=>{
          this.taskService.getTaskById(this.task.id+"").subscribe(
            result =>{
              this.task = new Task(result.data)
            }
          )
        }
      )
    }
  }

  addTask(){
    this.router.navigate(['task-list/new-task']);
  }

  unlinkFromParent(){
    this.taskService.updateTask(this.task.id, {"parent_id": null}).subscribe(
      result=>{
        this.taskService.getTaskById(this.task.id+"").subscribe(
          result =>{
            this.task = new Task(result.data)
          }
        )
      }
    )
  }

  unlinkSubtask(value){
    this.taskService.updateTask(value, {"parent_id":null}).subscribe(
      result=>{
        this.taskService.getTaskById(this.task.id+"").subscribe(
          result =>{
            this.task = new Task(result.data)
          }
        )
      }
    )
  }

  assignToMe(){
    this.userService.getUser().subscribe((user:any) => {

      this.taskService.updateTask(this.task.id, {"assignee_id": user.id}).subscribe(
        data=>{
          this.task.assignee = user;
          this.task.status = "in_progress";
        },
        error=>{
          console.log("ERROR")
        }
      )
    })
  }

  isAssignedToMe(){
    this.userService.getUser().subscribe(
      (user:any) => {
        return user.id == this.task.assignee.id;
    })
  }

  unasign(){
    this.taskService.updateTask(this.task.id, {"assignee_id": null, "status":"free"}).subscribe(
      data=>{
        this.task.assignee = null;
        this.task.status = "free";
      },
      error=>{
        console.log("ERROR")
      }
    )
  }

  totest(){
    this.taskService.updateTask(this.task.id, {"status":"to_test"}).subscribe(
      data=>{
        this.task.status = "to_test";
      },
      error=>{
        console.log("ERROR")
      }
    )
  }

  done(){
    this.taskService.updateTask(this.task.id, {"status":"done"}).subscribe(
      data=>{
        this.task.status = "done";
      },
      error=>{
        console.log("ERROR")
      }
    )
  }

  assignTo(id:number){
    this.taskService.updateTask(this.task.id, {"assignee_id": id}).subscribe(
      data=>{
        this.task.assignee = this.getLocalTeamMember(id);
        if (this.task.status = "free") {
          this.task.status = "in_progress";
        }
      },
      error=>{
        console.log("ERROR")
      }
    )
  }

  getLocalTeamMember(id:number):any{
    for(let member of this.team){
      if(member.id == id){
        return {
          id: id,
          name: member.name,
          email: member.email,
          is_project_manager: member.is_project_manager,
          created_at: null,
          updated_at: null
        }
      }
    }
    return null
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    });
  }
}
