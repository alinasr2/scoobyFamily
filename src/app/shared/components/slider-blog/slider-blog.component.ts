import { Component, inject } from '@angular/core';
import { BlogService } from '../../../core/services/blog/blog.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Blog } from '../../interfaces/blog';
import { NgFor } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-slider-blog',
  imports: [NgFor,CarouselModule,TranslatePipe],
  templateUrl: './slider-blog.component.html',
  styleUrl: './slider-blog.component.scss'
})
export class SliderBlogComponent {
  blogService = inject(BlogService);
  blogs:Blog[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    rtl: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  ngOnInit(): void {
   this.getAllBlogs();
    
  }

  getAllBlogs():void{
    this.blogService.getAllBlogs().subscribe({
      next:(res)=>{
        this.blogs = res.data;
      }
    })
  }
}
