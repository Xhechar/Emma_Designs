import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/fashion.interfaces';

@Component({
  selector: 'app-newproduct',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './newproduct.component.html',
  styleUrl: './newproduct.component.css'
})
export class NewproductComponent {
  newProductForm!: FormGroup;
  imageUrls!: string[];

  constructor(private fb: FormBuilder, private productService: ProductsService) {
    this.newProductForm = this.fb.group({
      name: ['', [Validators.required]],
      cartegory: ['', [Validators.required]],
      type: ['', [Validators.required]],
      short_desc: ['', [Validators.required]],
      long_desc: ['', [Validators.required]],
      images: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      stock_quantity: ['', [Validators.required]],
      max_quantity: ['', [Validators.required]]
    })
  };

  createProduct() {
    this.productService.createProduct(this.newProductForm.value as Product).subscribe(res => {
      console.log(res);
    })
  }

  getImageUrls(event: any) {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('cloud_name', 'darkiyiye2e');
    formData.append('upload_preset', 'emma_designs');

    fetch('https://api.cloudinary.com/v1_1/darkiyiye2e/image/upload', {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(res => {
      this.imageUrls.push(res.url);
      this.newProductForm.patchValue({ images: this.imageUrls });
    })
  }
}
