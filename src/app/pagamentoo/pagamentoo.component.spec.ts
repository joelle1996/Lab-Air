import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentooComponent } from './pagamentoo.component';

describe('PagamentooComponent', () => {
  let component: PagamentooComponent;
  let fixture: ComponentFixture<PagamentooComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagamentooComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagamentooComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
