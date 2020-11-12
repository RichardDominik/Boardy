import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskContainerComponent } from './new-task-container.component';

describe('NewTaskContainerComponent', () => {
  let component: NewTaskContainerComponent;
  let fixture: ComponentFixture<NewTaskContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTaskContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
