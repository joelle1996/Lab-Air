import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarellooComponent } from './carelloo.component';

describe('CarellooComponent', () => {
  let component: CarellooComponent;
  let fixture: ComponentFixture<CarellooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarellooComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarellooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
