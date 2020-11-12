import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonDetailContainerComponent } from './person-detail-container.component';

describe('PersonDetailContainerComponent', () => {
  let component: PersonDetailContainerComponent;
  let fixture: ComponentFixture<PersonDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonDetailContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
