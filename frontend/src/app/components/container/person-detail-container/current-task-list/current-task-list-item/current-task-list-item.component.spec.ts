import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTaskListItemComponent } from './current-task-list-item.component';

describe('CurrentTaskListItemComponent', () => {
  let component: CurrentTaskListItemComponent;
  let fixture: ComponentFixture<CurrentTaskListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentTaskListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTaskListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
