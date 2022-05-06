import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnOrderViewComponent } from './return-order-view.component';

describe('ReturnOrderViewComponent', () => {
  let component: ReturnOrderViewComponent;
  let fixture: ComponentFixture<ReturnOrderViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnOrderViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
