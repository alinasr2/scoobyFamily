import { Component, HostListener, inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { isPlatformBrowser, NgClass, NgIf } from '@angular/common';
import { MyTranslationService } from '../../../core/services/myTranslate/my-translate.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf,TranslatePipe,NgClass],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() isLogin: boolean = false;
  private ID:any = inject(PLATFORM_ID);
  private readonly myTranslationService = inject(MyTranslationService);
  isSidebarOpen = false;
  isMobileScreen:any;
  currentLang: string = 'en';

  navItems = [
    { path: '/home', label: 'Home', icon: 'fas fa-home' },
    { path: '/adoption', label: 'Adoption', icon: 'fas fa-paw' },
    { path: '/vet', label: 'Veterinary', icon: 'fas fa-syringe' },
    { path: '/services', label: 'Services', icon: 'fas fa-cog' },
    { path: '/shop', label: 'Shop', icon: 'fas fa-shopping-bag' },
    { path: '/community', label: 'Community', icon: 'fas fa-users' }
  ];

  iconNavItems = [
    { path: '/search', icon: 'fas fa-search' },
    { path: '/wishlist', icon: 'fas fa-heart' },
    { path: '/profile', icon: 'fas fa-user' }
  ];

  ngOnInit() {
    this.checkScreenSize();
    if (isPlatformBrowser(this.ID)) {
      this.isMobileScreen = window.innerWidth < 768;
      this.currentLang = localStorage.getItem('lang') || 'en';
    }
  }

  private checkScreenSize() {
    const wasMobile = this.isMobileScreen;
    if (isPlatformBrowser(this.ID)) {
      this.isMobileScreen = window.innerWidth < 768;
    }
    if (!this.isMobileScreen && this.isSidebarOpen) {
      this.isSidebarOpen = false;
    }
    
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;
  }
  change():void{
    // this.myTranslationService.changeLang(lang);
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
  this.myTranslationService.changeLang(this.currentLang);
  }
}