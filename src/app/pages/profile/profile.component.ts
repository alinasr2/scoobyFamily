import { Component, ElementRef, inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { iuser } from '../../shared/interfaces/Iuser';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, RouterLink, TranslatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  private readonly userService = inject(UserService);
  router = inject(Router);
  ID:any = inject(PLATFORM_ID);
  @ViewChild('fileInput') fileInput!: ElementRef;
  user: iuser = {
    name: '',
    email: '',
    phoneNumber: '',
    profileImage: '',
    role: '',
    _id: '',
    pets: [],
    services_id: [],
    followers: [],
    following: [],
    favPet: [],
    favProduct: [],
    cards: [],
    __v: 0,
    pet: [],
    id: ''
  };
  selectedFile: File | null | string = null;
  successMessage: string = '';
  errorMessage: string = '';

  ngOnInit(): void {
    this.getMe();
  }

  getMe(): void {
    this.userService.getMe().subscribe({
      next: (res) => {
        this.user = res.data.data;        
      },
      error: (err) => {
        this.errorMessage = 'Failed to load profile data. Please try again.';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  handleImageUpload(event: Event, imgElement: HTMLImageElement): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validate file type
      if (!file.type.match('image.*')) {
        this.errorMessage = 'Please select a valid image file (JPEG, PNG, etc.)';
        setTimeout(() => this.errorMessage = '', 5000);
        return;
      }
      
      // Validate file size (e.g., 5MB max)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'Image size should be less than 5MB';
        setTimeout(() => this.errorMessage = '', 5000);
        return;
      }
      
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result;
        imgElement.src = e.target.result;
        this.successMessage = 'Image uploaded successfully. Click save to update your profile.';
        setTimeout(() => this.successMessage = '', 5000);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeProfileImage(imgElement: HTMLImageElement): void {
    this.selectedFile = null;
    this.user.profileImage = 'https://res.cloudinary.com/dhddxcwcr/image/upload/v1700416252/6558f05c2841e64561ce75d1_Cover.jpg';
    imgElement.src = 'https://res.cloudinary.com/dhddxcwcr/image/upload/v1700416252/6558f05c2841e64561ce75d1_Cover.jpg';
    this.selectedFile = 'https://res.cloudinary.com/dhddxcwcr/image/upload/v1700416252/6558f05c2841e64561ce75d1_Cover.jpg';
    this.successMessage = 'Profile image removed successfully';
    setTimeout(() => this.successMessage = '', 5000);
  }

  saveChanges(): void {
    if (!this.user.name || !this.user.phoneNumber) {
      this.errorMessage = 'Please fill in all required fields';
      setTimeout(() => this.errorMessage = '', 5000);
      return;
    }

    let updateForm = new FormData();
    
    if (this.selectedFile && typeof this.selectedFile !== 'string') {
      updateForm.append('profileImage', this.selectedFile);
    }
    
    updateForm.append('phoneNumber', this.user.phoneNumber);
    updateForm.append('name', this.user.name);
    
    this.userService.updateUser(updateForm).subscribe({
      next: (res) => {
        this.getMe();
        this.successMessage = 'Profile updated successfully';
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: (err) => {
        this.errorMessage = 'Error updating profile. Please try again.';
        if (err.error?.message) {
          this.errorMessage = err.error.message;
        }
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  signOut(): void {
    if (isPlatformBrowser(this.ID)) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login']);
  }
}