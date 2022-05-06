import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionTypeViewComponent } from './promotion-type-view.component';

describe('PromotionTypeViewComponent', () => {
  let component: PromotionTypeViewComponent;
  let fixture: ComponentFixture<PromotionTypeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionTypeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
