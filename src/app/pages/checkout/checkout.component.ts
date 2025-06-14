import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { cart } from '../../shared/interfaces/cart';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  cart: cart | null = null;

  checkoutForm: FormGroup = new FormGroup({
    phone: new FormControl(null, [Validators.required, Validators.pattern('^01[0-2,5]{1}[0-9]{8}$')]),
    city: new FormControl(null, [Validators.required]),
    postalcode: new FormControl(null, [Validators.required]),
    details: new FormControl(null)
  });

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

  checkoutSession(): void {
    if (!this.cart) return;
    
    if (this.checkoutForm.valid) {
      this.cartService.checkoutSession(this.cart.data._id, this.checkoutForm.value).subscribe({
        next: (res) => {
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}