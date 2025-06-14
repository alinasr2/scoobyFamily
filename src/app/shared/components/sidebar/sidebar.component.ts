import { Component, inject, OnInit, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';
import { User } from '../../interfaces/service-profile';
import { initDrawers } from 'flowbite';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { MyTranslationService } from '../../../core/services/myTranslate/my-translate.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,NgClass,TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly myTranslationService = inject(MyTranslationService);
  private ID:any = inject(PLATFORM_ID);
  user: User = {
    _id: '',
    name: '',
    profileImage: '',
    id: ''
  };
  currentLang: string = 'en';
  ngOnInit(): void {
    this.getMe();
    if (isPlatformBrowser(this.ID)) {
      this.currentLang = localStorage.getItem('lang') || 'en';
    }
  }
  ngAfterViewInit(): void {
    initDrawers();
  }
  getMe(): void {
    this.userService.getMe().subscribe({
      next: (res) => {
        this.user = res.data.data;
      }
    });
  }
  change():void{
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.myTranslationService.changeLang(this.currentLang);
  }
}

