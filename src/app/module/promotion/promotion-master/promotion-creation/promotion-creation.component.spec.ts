import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionCreationComponent } from './promotion-creation.component';

describe('PromotionCreationComponent', () => {
  let component: PromotionCreationComponent;
  let fixture: ComponentFixture<PromotionCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromotionCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotionCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
