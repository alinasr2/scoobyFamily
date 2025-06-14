import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  imports: [],
  templateUrl: './back-to-top.component.html',
  styleUrl: './back-to-top.component.scss'
})
export class BackToTopComponent {
   isVisible = false;

  @HostListener('window:scroll')
    onWindowScroll() {
    this.isVisible = window.scrollY >= 200;
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
}
