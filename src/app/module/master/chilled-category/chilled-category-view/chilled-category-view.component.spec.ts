import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChilledCategoryViewComponent } from './chilled-category-view.component';

describe('ChilledCategoryViewComponent', () => {
  let component: ChilledCategoryViewComponent;
  let fixture: ComponentFixture<ChilledCategoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChilledCategoryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChilledCategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
