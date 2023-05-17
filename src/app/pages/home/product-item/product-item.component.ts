import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductFullViewComponent } from '../product-full-view/product-full-view.component';
import { IProduct } from '../../../shared/data-access/product/product.service';
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() product!: IProduct;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(ProductFullViewComponent, {
      data: this.product,
    });
  }
}
