import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import {
  ProductService,
  IProduct,
} from '../../shared/data-access/product/product.service';
import { JwtService, IToken } from '../../shared/data-access/jwt/jwt.service';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products!: Observable<IProduct[]>;
  jwt!: Observable<IToken | null>;
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private jwtServcie: JwtService,
    private router: Router
  ) {
    this.products?.subscribe((value) => {
      // Function to execute when the variable changes
      console.log({ value });
    });
  }

  ngOnInit(): void {
    this.productService.requestProducts();
    this.products = this.productService.getProducts();
    this.jwt = this.jwtServcie.getJwt();

    this.dialog.open(AddProductComponent);
  }

  public addProduct(data: IProduct) {
    this.productService.addProduct(data);
  }

  openAddProductModal() {
    this.dialog.open(AddProductComponent);
  }
}
