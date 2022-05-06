import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailsListComponent } from './order-details-list.component';

describe('OrderDetailsListComponent', () => {
  let component: OrderDetailsListComponent;
  let fixture: ComponentFixture<OrderDetailsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
