import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import IProduct from '../../interfaces/Product';

@Component({
  selector: 'app-product-full-view',
  templateUrl: './product-full-view.component.html',
  styleUrls: ['./product-full-view.component.scss'],
})
export class ProductFullViewComponent implements OnInit {
  product: IProduct;

  constructor(@Inject(MAT_DIALOG_DATA) public data: IProduct) {
    this.product = data;
  }

  ngOnInit(): void {
    console.log(this.product);
  }
}
