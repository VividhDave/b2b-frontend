import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkOrderListComponent } from './bulk-order-list.component';

describe('BulkOrderListComponent', () => {
  let component: BulkOrderListComponent;
  let fixture: ComponentFixture<BulkOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
