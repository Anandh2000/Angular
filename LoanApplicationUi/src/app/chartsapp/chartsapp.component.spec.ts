import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartsappComponent } from './chartsapp.component';

describe('ChartsappComponent', () => {
  let component: ChartsappComponent;
  let fixture: ComponentFixture<ChartsappComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartsappComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartsappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
