import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormValidationService } from '../.././../shared/services/form-validation/form-validation.service';
import {
  ProductService,
  IProduct,
} from '../.././../shared/data-access/product/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  constructor(
    private fb: FormBuilder,
    private formValidation: FormValidationService,
    private productService: ProductService
  ) {
    this.addProductForm.valueChanges.subscribe((value) => {
      // console.log({ value });
      // console.log({ controls: this.addProductForm.controls });
    });
  }

  public addProductForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    description: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(500)],
    ],
    imageLink: ['', [Validators.minLength(0), Validators.maxLength(4000)]],
    price: [
      '',
      [Validators.required, Validators.min(0), Validators.max(1000000)],
    ],
    inStock: [
      '',
      [Validators.required, Validators.min(0), Validators.max(1000)],
    ],
  });

  public validationByField = (field: string) => {
    return this.formValidation.validationByField(field, this.addProductForm);
  };

  public onSubmit() {
    if (this.addProductForm.invalid) {
      return console.log('invalid');
    }

    this.productService.addProduct({
      description: `${this.addProductForm.value.description}`,
      imageLink: `${this.addProductForm.value.imageLink}`,
      name: `${this.addProductForm.value.name}`,
      price: Number(this.addProductForm.value.price),
      inStock: Number(this.addProductForm.value.inStock),
      seller: '6463f2f3bbe6ebe6a1881ddc',
    });
  }

  public addProduct(data: IProduct) {
    this.productService.addProduct(data);
  }

  ngOnInit(): void {}
}
