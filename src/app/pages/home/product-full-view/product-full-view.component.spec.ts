import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFullViewComponent } from './product-full-view.component';

describe('ProductFullViewComponent', () => {
  let component: ProductFullViewComponent;
  let fixture: ComponentFixture<ProductFullViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFullViewComponent]
    });
    fixture = TestBed.createComponent(ProductFullViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
