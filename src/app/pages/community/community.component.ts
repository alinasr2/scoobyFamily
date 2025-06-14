import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { CommunityService } from '../../core/services/community.service';
import { Post } from '../../shared/interfaces/post';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { iuser } from '../../shared/interfaces/Iuser';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-community',
  imports: [FormsModule,RouterLink,TranslatePipe] ,
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit {
  activePrivacy: 'public' | 'private' = 'public'; 
  postText: string = '';
  image: File | null = null;
  posts: Post[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  previewImageUrl: string | null = null;
  user:iuser = {
    _id: '',
    name: '',
    email: '',
    profileImage: '',
    pets: [],
    role: '',
    services_id: [],
    followers: [],
    following: [],
    favPet: [],
    favProduct: [],
    cards: [],
    __v: 0,
    pet: [],
    id: '',
    phoneNumber: ''
  };
  private communityService = inject(CommunityService);
  private userService = inject(UserService);
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.getUser();
    this.getAllPosts();
  }
  getUser():void{
    this.userService.getMe().subscribe({
      next:(res)=>{
        this.user = res.data.data;
      }
    })
  }
  getAllPosts(): void {
    this.isLoading = true;
    this.communityService.getAllPosts().subscribe({
      next: (res) => {
        this.posts = res.processedPosts;
        this.isLoading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = 'Failed to load posts. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  likeAndDislike(id: string): void {
    this.communityService.likeAndDislike(id).subscribe({
      next: (res) => {
        const postIndex = this.posts.findIndex(p => p.post._id === id);
        if (postIndex !== -1) {
          this.posts[postIndex].liked = !this.posts[postIndex].liked;
          if (this.posts[postIndex].liked) {
            this.posts[postIndex].post.likesNumber = (this.posts[postIndex].post.likesNumber || 0) + 1;
          } else {
            this.posts[postIndex].post.likesNumber = Math.max(0, (this.posts[postIndex].post.likesNumber || 1) - 1);
          }
        }
      }
    });
  }

  getTimeAgo(dateString: string): string {
    const now = new Date();
    const past = new Date(dateString);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals = [
      { unit: 'year', seconds: 31536000 },
      { unit: 'month', seconds: 2592000 },
      { unit: 'week', seconds: 604800 },
      { unit: 'day', seconds: 86400 },
      { unit: 'hour', seconds: 3600 },
      { unit: 'minute', seconds: 60 }
    ];

    for (const interval of intervals) {
      const count = Math.floor(diff / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.unit}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'just now';
  }

  addPost(): void {
    if (!this.postText.trim()) {
      this.errorMessage = 'Post text cannot be empty';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formData = new FormData();
    formData.append('description', this.postText);
    formData.append('onlyMe', String(this.activePrivacy === 'private'));

    if (this.image) {
      formData.append('postImage', this.image);
    }

    this.communityService.addPost(formData).subscribe({
      next: (res) => {
        this.postText = '';
        this.image = null;
        this.previewImageUrl = null;
        this.getAllPosts();
      },
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.error?.message || 'Failed to add post. Please try again.';
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  changeImage(event: Event, fileInput: HTMLInputElement): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.image = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImageUrl = reader.result as string;
      };
      reader.readAsDataURL(this.image);
      fileInput.value = '';
    }
}


  clearImage(): void {
    this.image = null;
    this.previewImageUrl = null;
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }


  dismissError(): void {
    this.errorMessage = null;
  }

}