import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from 'src/app/model/task';
import { Priority } from 'src/app/model/enum/priority.enum';
import { Status } from 'src/app/model/enum/status.enum';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/shared/services/task.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subtask-list',
  templateUrl: './subtask-list.component.html',
  styleUrls: ['./subtask-list.component.css']
})
export class SubtaskListComponent implements OnInit {
  @Input() task: Task;
  priority = Priority;
  status = Status;
  parent: Task;
  @Output() addTask: EventEmitter<any> = new EventEmitter();
  @Output() removeParent: EventEmitter<any> = new EventEmitter();
  @Output() removeSubtask: EventEmitter<number> = new EventEmitter();
  subtaskToRemove: number;
  
  constructor(
    public router:Router,
    private taskService: TaskService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    if (this.task.parent_id) {
      this.taskService.getTaskById(""+this.task.parent_id).subscribe(
        result=>{
          this.parent = new Task(result.data)
        }
      );
    }
  }

  onAddLink(){
    this.addTask.emit()
  }

  onRemoveParent(){
    this.removeParent.emit()
  }

  remove(){
    this.removeSubtask.emit(this.subtaskToRemove)
  }

  onRemoveSubtask(value){
    this.subtaskToRemove = value
  }

  showTaskDetail(id:string){
    this.redirectTo(id);
  }

  redirectTo(id:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['task-list', 'task-detail'],  { queryParams: { id: id }}));
  }

  onScroll(event) {
    event.target.getElementsByTagName("thead")[0].scrollLeft = event.target.scrollLeft;
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
    });
  }

}
