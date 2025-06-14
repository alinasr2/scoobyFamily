import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Coupon } from '../../shared/interfaces/coupon';
import { ReusableTableComponent } from '../../shared/components/reusable-table/reusable-table.component';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-coupons',
  standalone: true,
  imports: [ReusableTableComponent, Dialog, InputTextModule, FloatLabel, FormsModule, CommonModule,TranslatePipe],
  templateUrl: './admin-coupons.component.html',
  styleUrl: './admin-coupons.component.scss'
})
export class AdminCouponsComponent implements OnInit {
  private readonly cartService = inject(CartService);
  visible: boolean = false;
  coupons: Coupon[] = [];
  name: string = '';
  discount: number = 0;
  expire: string = '';
  isButtonDisabled: boolean = true;
  isPastDate: boolean = false;
  minDate: string;
  
  columns = [
    { header: 'Coupon Name', field: 'name', width: '25%' },
    { header: 'Coupon Discount ( % )', field: 'discount', width: '25%' },
    { header: 'Coupon Expire', field: 'expire', width: '25%' },
    { header: 'Coupon Created', field: 'createdAt', width: '25%' },
  ];

  constructor() {
    // Set minimum date to tomorrow
    const today = new Date();
    today.setDate(today.getDate() + 1);
    this.minDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.getAllCoupons();
  }

  getAllCoupons(): void {
    this.cartService.getAllCoupons().subscribe({
      next: (res) => {
        this.coupons = res.data;
      }
    });
  }

  showDialog() {
    this.visible = true;
  }
    
  checkInputs(): void {
    this.isButtonDisabled = !(this.name.trim() && this.discount > 0 && this.expire);
  }

  validateDiscount(): void {
    if (this.discount > 100) {
      this.discount = 100;
    } else if (this.discount < 0) {
      this.discount = 0;
    }
  }

  validateDate(): void {
    if (this.expire) {
      const selectedDate = new Date(this.expire);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      this.isPastDate = selectedDate < today;
    }
  }

  createCoupon(): void {
    if (this.discount > 100 || this.isPastDate) {
      return;
    }

    const couponData = {
      name: this.name,
      discount: this.discount,
      expire: this.expire
    };

    this.cartService.createCoupon(couponData).subscribe({
      next: (res) => {
        console.log(res);
        this.resetForm();
        this.getAllCoupons();
      }
    });
  }

  resetForm(): void {
    this.name = '';
    this.discount = 0;
    this.expire = '';
    this.isButtonDisabled = true;
    this.isPastDate = false;
    this.visible = false;
  }
}