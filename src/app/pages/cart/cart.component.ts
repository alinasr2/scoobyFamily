import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { cart } from '../../shared/interfaces/cart';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  private readonly cartService = inject(CartService);
  cart: cart | null = null;

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
      },
      error: () => {
        this.cart = null;
      }
    });
  }

  removeFromCart(id: any): void {
    this.cartService.deleteFromCart(id).subscribe({
      next: () => {
        this.getCart();
      }
    });
  }

  increaseProductQuanitity(id: any): void {
    this.cartService.increaseProductQuanitity(id).subscribe({
      next: () => {
        this.getCart();
      }
    });
  }

  reduceProductQuanitity(id: any): void {
    this.cartService.reduceProductQuanitity(id).subscribe({
      next: () => {
        this.getCart();
      }
    });
  }

  deleteCart(): void {
    this.cartService.deleteCart().subscribe({
      next: () => {
        this.getCart();
      }
    });
  }

  applyCoupon(Icoupon: any): void {
    if (!this.cart) return;
    
    let form: object = { coupon: Icoupon }
    this.cartService.applyCoupon(form).subscribe({
      next: (res) => {
        if (this.cart) {
          this.cart.data.totalPriceAfterDiscount = res.data.totalPriceAfterDiscount;
        }
      }
    });
  }
}