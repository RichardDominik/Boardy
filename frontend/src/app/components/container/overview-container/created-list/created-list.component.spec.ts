import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedListComponent } from './created-list.component';

describe('CreatedListComponent', () => {
  let component: CreatedListComponent;
  let fixture: ComponentFixture<CreatedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
