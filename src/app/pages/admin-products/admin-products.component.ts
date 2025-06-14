import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop/shop.service';
import { Product } from '../../shared/interfaces/product';
import { ReusableTableComponent } from "../../shared/components/reusable-table/reusable-table.component";
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-products',
  imports: [ReusableTableComponent, Dialog, ButtonModule, InputTextModule, FloatLabel, FormsModule, NgIf, DropdownModule,TranslatePipe],
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent implements OnInit {
  private readonly shopService = inject(ShopService);
  visible: boolean = false;
  products: Product[] = [];
  
  // Form fields
  name: string = '';
  price: number | null = null;
  quantity: number | null = null;
  discount: number | null = null;
  category: string = '';
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  isButtonDisabled: boolean = true;

  // Categories dropdown options
  categories = [
    { label: 'Medicines', value: 'medicine' },
    { label: 'Food', value: 'food' },
    { label: 'Toys', value: 'toys' },
    { label: 'Grooming', value: 'grooming' },
    { label: 'Accessories', value: 'accessories' }
  ];

  columns = [
    { header: 'Product Name', field: 'name', width: '20%' },
    { header: 'Product Price', field: 'price', width: '20%' },
    { header: 'Product Discount', field: 'discount', width: '20%' },
    { header: 'Product Category', field: 'category', width: '20%' },
    { header: 'Product Image', field: 'productImage', width: '20%' },
  ];

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.shopService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      }
    });
  }

  showDialog() {
    this.visible = true;
  }
    
  checkInputs(): void {
    const allFieldsFilled = 
      this.name.trim() !== '' && 
      this.price !== null && this.price > 0 &&
      this.quantity !== null && this.quantity >= 0 &&
      this.discount !== null && this.discount >= 0 && this.discount <= 100 &&
      this.category !== '' && 
      this.selectedFile !== null;

    this.isButtonDisabled = !allFieldsFilled;
  }

  createProduct(): void {
    if (this.isButtonDisabled) return;
    
    const form = new FormData();
    form.append('name', this.name);
    form.append('price', this.price!.toString());
    form.append('quantity', this.quantity!.toString());
    form.append('discount', this.discount!.toString());
    form.append('category', this.category.toLowerCase());
    if (this.selectedFile) {
      form.append('productImage', this.selectedFile, this.selectedFile.name);
    }
    
    this.shopService.createProduct(form).subscribe({
      next: (res) => {
        console.log(res);
        this.resetForm();
        this.getAllProducts();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
      this.checkInputs();
    }
  }

  resetForm(): void {
    this.name = '';
    this.price = null;
    this.quantity = null;
    this.discount = null;
    this.category = '';
    this.selectedFile = null;
    this.previewImage = null;
    this.isButtonDisabled = true;
    this.visible = false;
  }
}