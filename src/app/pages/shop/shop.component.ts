import { Component, inject, OnInit } from '@angular/core';
import { ShopService } from '../../core/services/shop/shop.service';
import { Product } from '../../shared/interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { NgClass, NgFor } from '@angular/common';
import { CartService } from '../../core/services/cart/cart.service';
import { cart } from '../../shared/interfaces/cart';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { OffersService } from '../../core/services/offers/offers.service';
import { Offer } from '../../shared/interfaces/offer';
import { initDrawers, initFlowbite } from 'flowbite';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [NgClass, CarouselModule, NgFor,TranslatePipe],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  private readonly shopService = inject(ShopService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly offersService = inject(OffersService);
  
  products: Product[] = [];
  offers: Offer[] = [];
  favProducts: Product[] = [];
  cart: cart = {} as cart;
  page: any;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedCategory: string = '';

  customOptions: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplaySpeed: 1000,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 1 },
      740: { items: 2 },
      940: { items: 3 }
    },
    nav: false
  }

  ngOnInit(): void {
    this.getProductsInCart();
    this.getFavProducts();
    this.getPage();
    this.getAllOffers();

    const category = this.activatedRoute.snapshot.queryParams['category'];
    const page = this.activatedRoute.snapshot.queryParams['page'] || 1;
    
    if (category) {
      this.selectedCategory = category;
      this.getProductsByQuery(page, category);
    } else {
      this.getAllProducts(page);
    }
  }

  getAllProducts(page: any): void {
    this.selectedCategory = '';
    this.router.navigate(['/shop'], { queryParams: { 'page': page || 1 } });
    this.shopService.GetAllProducts(page || 1).subscribe({
      next: (res) => {
        this.products = res.data;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
      }
    });
  }

  getPage(): void {
    this.activatedRoute.queryParams.subscribe({
      next: (res) => {
        this.page = res['page'];
      }
    });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    
    if (this.selectedCategory) {
      this.router.navigate(['/shop'], { queryParams: { 'page': page, 'category': this.selectedCategory } });
      this.getProductsByQuery(page, this.selectedCategory);
    } else {
      this.router.navigate(['/shop'], { queryParams: { 'page': page } });
      this.getAllProducts(page);
    }
  }

  getProductsByQuery(page: any, category: string): void {
    this.selectedCategory = category;
    this.router.navigate(['/shop'], { queryParams: { 'page': page || 1, 'category': category } });
    this.shopService.GetProductsByQuery(page || 1, category).subscribe({
      next: (res) => {
        this.products = res.data;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
      }
    });
  }

  getProductsBySearch(search: string): void {
    this.selectedCategory = '';
    this.shopService.GetProdutcsBySearch(search).subscribe({
      next: (res) => {
        this.products = res.data;
        this.totalPages = 1;
        this.currentPage = 1;
      }
    });
    this.router.navigate(['/shop']);
  }

  addToCart(id: string): void {
    this.shopService.AddToCart(id).subscribe({
      next: (res) => {
        this.getProductsInCart();
      }
    });
  }

  addToFav(id: string): void {
    this.shopService.AddToFavourite(id).subscribe({
      next: (res) => {
        this.getFavProducts();
      }
    });
  }

  getFavProducts(): void {
    this.wishlistService.getFavourtieProduct().subscribe({
      next: (res) => {
        this.favProducts = res.data;
      }
    });
  }

  getProductsInCart(): void {
    this.cartService.getCart().subscribe({
      next: (res) => {
        this.cart = res;
      }
    });
  }

  isFav(product: Product): boolean {
    return this.favProducts.some(fav => fav._id == product._id);
  }

  inCart(product: Product): boolean {
    return this.cart?.data?.cartItems?.some(prod => product._id == prod.product._id) || false;
  }

  getAllOffers(): void {
    this.offersService.getAllOffers().subscribe({
      next: (res) => {
        this.offers = res.data;
      }
    });
  }
ngAfterViewInit(): void {
  initFlowbite();
}
  
}