import { NgClass, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit} from '@angular/core';
import { ServiceProfileService } from '../../core/services/serviceProfile/service-profile.service';
import { ServiceProfile } from '../../shared/interfaces/service-profile';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RequestService } from '../../core/services/request/request.service';
import { UserService } from '../../core/services/user/user.service';
import { ReviewsService } from '../../core/services/reviews/reviews.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-service-profile',
  standalone: true,
  imports: [NgIf,ReactiveFormsModule,RouterLink,TranslatePipe,NgClass],
  templateUrl: './service-profile.component.html',
  styleUrl: './service-profile.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServiceProfileComponent implements OnInit {
  private readonly serviceProfileService = inject(ServiceProfileService)
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly requestService = inject(RequestService);
  private readonly userService = inject(UserService);
  private readonly reviewsService = inject(ReviewsService);
  id:any;
  myId:any;
  selectedRating: number = 0;
  selectedIndex: number = 0;
  activeTab: string = 'tab1';
  serviceProfiles:ServiceProfile = {
    _id: '',
    icon: '',
    name: '',
    description: '',
    rate: 0,
    numberOfRate: 0,
    imagesProfile: [],
    price: 0,
    from: 0,
    to: 0,
    pricePer: '',
    about: '',
    accepted_pet_types: [],
    accepted_pet_sizes: [],
    question1: [],
    question2: [],
    question3: [],
    __v: 0,
    serviceProfile: '',
    reviewsOfService: [],
    id: ''
  };
  imagesProfile:any[] = [];
  successMessage: string = '';
  errorMessage: string = '';
  
  requestForm:FormGroup = new FormGroup({
    serviceType: new FormControl(null,Validators.required),
    date: new FormControl(null , Validators.required),
    duration: new FormControl(null , Validators.required)
  });
  
  reviewForm:FormGroup = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    review: new FormControl(null,[Validators.required]),
    rating: new FormControl(null,Validators.required)
  });

  ngOnInit(): void {
    this.getId();
    this.getMe();
    this.getServiceProfile();
    this.setRating(0);
  }

  setRating(num:number): void {
    this.selectedRating = num;
    this.reviewForm.patchValue({
      rating: this.selectedRating,
    });
  }

  getMe():void{
    this.userService.getMe().subscribe({
      next:(res)=>{
        this.myId = res.data.data._id;        
        this.reviewForm.patchValue({
          name : res.data.data.name,
          email : res.data.data.email
        });
      },
      error: (err) => {
        this.errorMessage = 'Failed to load user data';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  submit():void{
    this.reviewForm.markAllAsTouched();
    if(this.reviewForm.valid){
      this.sendReview();
      this.selectedRating = 0;
    } else {
      this.errorMessage = 'Please fill all required review fields';
      setTimeout(() => this.errorMessage = '', 5000);
    }
  }

  submitRequestForm():void{
    this.requestForm.markAllAsTouched();
    
    if (this.requestForm.invalid) {
      this.errorMessage = 'Please fill all required fields';
      setTimeout(() => this.errorMessage = '', 5000);
      return;
    }

    // Validate date is not in the past
    const selectedDate = new Date(this.requestForm.value.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      this.errorMessage = 'Please select a date in the future';
      setTimeout(() => this.errorMessage = '', 5000);
      return;
    }

    this.requestService.addRequest(this.requestForm.value).subscribe({
      next:(res)=>{
        this.successMessage = 'Request submitted successfully!';
        setTimeout(() => this.successMessage = '', 5000);
        this.requestForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to submit request. Please try again.';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  sendReview():void{
    this.reviewsService.CreateReviewService(this.id,this.reviewForm.value).subscribe({
      next:(res)=>{
        this.successMessage = 'Review submitted successfully!';
        setTimeout(() => this.successMessage = '', 5000);
        this.reviewForm.reset();
        this.getServiceProfile();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to submit review. Please try again.';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getServiceProfile():void{
    this.serviceProfileService.GetServiceProfile(this.id).subscribe({
      next:(res)=>{
        this.imagesProfile = res.updatedDoc.imagesProfile;
        this.serviceProfiles = res.updatedDoc;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load service details';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' }); 
    return `${month} ${day}, ${year} `;
  }

  getId():void{
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.id = res.get('id');        
      },
      error: (err) => {
        this.errorMessage = 'Failed to load service ID';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  deleteReview(id:any):void{
    this.reviewsService.deleteRview(id).subscribe({
      next:(res)=>{
        this.successMessage = 'Review deleted successfully';
        setTimeout(() => this.successMessage = '', 5000);
        this.getServiceProfile();
      },
      error: (err) => {
        this.errorMessage = 'Failed to delete review';
        setTimeout(() => this.errorMessage = '', 5000);
      }
    });
  }

  updateReview(rating:number , review:any , id:any):void{
    this.deleteReview(id);
    this.reviewForm.patchValue({
      rating: rating,
      review: review
    });
    this.selectedRating = rating;
  }
  
}