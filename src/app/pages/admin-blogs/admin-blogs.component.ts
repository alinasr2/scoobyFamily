import { Component, inject, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog/blog.service';
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { Blog } from '../../shared/interfaces/blog';
import { ReusableTableComponent } from "../../shared/components/reusable-table/reusable-table.component";
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-blogs',
  imports: [ReusableTableComponent,Dialog,ButtonModule,InputTextModule,FloatLabel,FormsModule,NgIf,TranslatePipe],
  templateUrl: './admin-blogs.component.html',
  styleUrl: './admin-blogs.component.scss'
})
export class AdminBlogsComponent implements OnInit{
  private readonly blogService = inject(BlogService);
  visible: boolean = false;
  blogs: Blog[] = [];
  description: string = '';
  blogLink: string = '';
  selectedFile: File | null = null;
  previewImage: string | ArrayBuffer | null = null;
  isButtonDisabled: boolean = true;
  columns = [
    { header: 'Blog Description', field: 'description', width: '75%' },
    { header: 'Blog Image', field: 'plogImage', width: '25%' }, 
  ];

  ngOnInit(): void {
    this.getAllBlogs();
  }

  getAllBlogs(): void {
    this.blogService.getAllBlogs().subscribe({
      next: (res) => {
        this.blogs = res.data;
      }
    });
  }

  showDialog() {
    this.visible = true;
  }
    
  checkInputs(): void {
    this.isButtonDisabled = !(this.description.trim() && this.blogLink.trim() && this.selectedFile);
  }

  createBlog(): void {
    const form = new FormData();
    form.append('description', this.description);
    form.append('link', this.blogLink);
    if (this.selectedFile) {
      form.append('plogImage', this.selectedFile, this.selectedFile.name);
    }
    this.blogService.createBlog(form).subscribe({
      next: (res) => {
        console.log(res);
        this.resetForm();
        this.getAllBlogs();
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
      this.checkInputs();
    }
  }

  resetForm(): void {
    this.description = '';
    this.blogLink = '';
    this.selectedFile = null;
    this.previewImage = null;
    this.isButtonDisabled = true;
    this.visible = false;
  }
}