import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDetailContainerComponent } from './task-detail-container.component';

describe('TaskDetailContainerComponent', () => {
  let component: TaskDetailContainerComponent;
  let fixture: ComponentFixture<TaskDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDetailContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
