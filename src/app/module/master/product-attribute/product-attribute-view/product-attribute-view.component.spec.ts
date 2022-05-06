import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeViewComponent } from './product-attribute-view.component';

describe('ProductAttributeViewComponent', () => {
  let component: ProductAttributeViewComponent;
  let fixture: ComponentFixture<ProductAttributeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAttributeViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
