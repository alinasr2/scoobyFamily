import { CartService } from './../../core/services/cart/cart.service';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Product } from '../../shared/interfaces/product';
import { cart, Data, CartItem } from '../../shared/interfaces/cart';
import { Pet } from '../../shared/interfaces/pet';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  imports: [NgClass, RouterLink,TranslatePipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  
  type: string = 'Default';
  products: Product[] = [];
  pets: Pet[] = [];
  cart: cart = {
    status: '',
    numOfCartItems: 0,
    data: this.createEmptyCartData()
  };

  ngOnInit(): void {
    this.getFavouriteProduct();
    this.getCart();
    this.getFavouritePet();
  }

  private createEmptyCartData(): Data {
    return {
      _id: '',
      cartItems: [],
      user: '',
      createdAt: '',
      updatedAt: '',
      __v: 0,
      totalCartPrice: 0,
      totalPriceAfterDiscount: 0
    };
  }

  getFavouriteProduct(): void {
    this.wishlistService.getFavourtieProduct().subscribe({
      next: (res) => {
        this.products = res.data;
      },
      error: (err) => {
        this.products = [];
      }
    });
  }

  getFavouritePet(): void {
    this.wishlistService.getFavourtiePet().subscribe({
      next: (res) => {
        this.pets = res.data;
      },
      error: (err) => {
        this.pets = [];
      }
    });
  }

  addToCart(id: string): void {
    this.wishlistService.AddToCart(id).subscribe({
      next: (res) => {
        this.getCart();
      }
    });
  }

  RemoveProductFromFavourite(id: string): void {
    this.wishlistService.RemoveProductFromFavourite(id).subscribe({
      next: (res) => {
        this.getFavouriteProduct();
      }
    });
  }

  RemovePetFromFavourite(id: string): void {
    this.wishlistService.RemovePetFromFavourite(id).subscribe({
      next: (res) => {
        this.getFavouritePet();
      }
    });
  }

  getCart(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
      },
      error: (err) => {
        this.cart = {
          status: 'error',
          numOfCartItems: 0,
          data: this.createEmptyCartData()
        };
      }
    });
  }

  inCart(product: Product): boolean {
    if (!this.cart?.data?.cartItems) return false;
    return this.cart.data.cartItems.some(item => item.product._id === product._id);
  }
}