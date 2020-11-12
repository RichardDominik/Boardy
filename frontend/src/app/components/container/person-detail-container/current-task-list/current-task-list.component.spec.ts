import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTaskListComponent } from './current-task-list.component';

describe('CurrentTaskListComponent', () => {
  let component: CurrentTaskListComponent;
  let fixture: ComponentFixture<CurrentTaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTaskListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
