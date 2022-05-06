import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChilledCategoryListComponent } from './chilled-category-list.component';

describe('ChilledCategoryListComponent', () => {
  let component: ChilledCategoryListComponent;
  let fixture: ComponentFixture<ChilledCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChilledCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChilledCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
