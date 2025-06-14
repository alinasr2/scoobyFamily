import { Component, inject, OnInit } from '@angular/core';
import { CommunityService } from '../../core/services/community.service';
import { Post } from '../../shared/interfaces/post';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { iuser } from '../../shared/interfaces/Iuser';
import { ActivatedRoute } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-account',
  imports: [FormsModule,TranslatePipe],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  posts: Post[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  user: iuser = {
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
  userId:any ;
  private readonly communityService = inject(CommunityService);
  private readonly userService = inject(UserService);
  private readonly activatedRoute = inject(ActivatedRoute);
  ngOnInit(): void {
    this.getUserId();
    this.getUser();
    this.getAllPosts(this.userId);
  }

  getUserId():void{
    this.activatedRoute.params.subscribe({
      next:(res)=>{
        this.userId = res['id']
      }
    })
  }
  getUser(): void {
    this.userService.getUser(this.userId).subscribe({
      next: (res) => {
        this.user = res.data.data;
      }
    })
  }

  getAllPosts(id:any): void {
    this.isLoading = true;
    this.communityService.getUserMoments(id).subscribe({
      next: (res) => {
        this.posts = res.processedPosts;
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

}