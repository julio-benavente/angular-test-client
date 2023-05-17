import { HttpClient } from '@angular/common/http';
import { NonNullAssert } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface IProduct {
  name: string;
  description: string;
  price: number;
  imageLink: string;
  inStock: number;
  seller: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products = new BehaviorSubject<IProduct[]>([]);
  constructor(private http: HttpClient) {}

  public requestProducts() {
    this.http
      .get<{ products: IProduct[] }>('http://localhost:4423/api/products', {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoianVkeUBlbWFpbC5jb20ifSwiaWF0IjoxNjg0Mjc4NDgxLCJleHAiOjE3NzA2Nzg0ODF9.YCNtTeajGjUOTY-st68iiHFsGAqjorboa-0Trbz498g',
        },
      })
      .subscribe({
        next: (products) => {
          this.products.next(products.products);
        },
        error: (error) => {
          console.log({ error });
        },
      });
  }

  public addProduct(data: IProduct) {
    this.http
      .post<{ product: IProduct }>('http://localhost:4423/api/products', data, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoianVkeUBlbWFpbC5jb20ifSwiaWF0IjoxNjg0Mjc4NDgxLCJleHAiOjE3NzA2Nzg0ODF9.YCNtTeajGjUOTY-st68iiHFsGAqjorboa-0Trbz498g',
        },
      })
      .subscribe({
        next: ({ product }) => {
          console.log({ productCreated: product });
          const updatedProducts = [...this.products.getValue(), product];
          this.products.next(updatedProducts);
        },
        error: (error) => {
          console.log({ error });
        },
      });
  }

  public getProducts(): Observable<IProduct[]> {
    return this.products;
  }
}
