import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TuttiprodottiComponent } from './Tutti-Prodotti.component';

describe('TuttiprodottiComponent', () => {
  let component: TuttiprodottiComponent;
  let fixture: ComponentFixture<TuttiprodottiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TuttiprodottiComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TuttiprodottiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
