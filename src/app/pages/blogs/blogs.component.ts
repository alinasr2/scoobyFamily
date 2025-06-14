import { Component, inject, OnInit } from '@angular/core';
import { Blog } from '../../shared/interfaces/blog';
import { BlogService } from '../../core/services/blog/blog.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-blogs',
  imports: [TranslatePipe],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss'
})
export class BlogsComponent implements OnInit {
  blogs:Blog[] = [];
  private readonly blogService = inject(BlogService);

  ngOnInit(): void {
    this.getAllBlogs()
    
  }
  getAllBlogs():void{
    this.blogService.getAllBlogs().subscribe({
      next:(res)=>{
        this.blogs = res.data;
      }
    })
  }
}
