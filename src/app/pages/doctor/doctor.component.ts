import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { VetService } from '../../core/services/vet/vet.service';
import { DoctorDetail } from '../../shared/interfaces/doctor-detail';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import { ReviewsService } from '../../core/services/reviews/reviews.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-doctor',
  imports: [ ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoctorComponent implements OnInit {
  private readonly vetService = inject(VetService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly userService = inject(UserService);
  private readonly reviewsService = inject(ReviewsService);
  
  doctor: DoctorDetail = {
    _id: '',
    name: '',
    doctorImage: '',
    description: '',
    review: '',
    __v: 0,
    numberOfRate: 0,
    rate: 0,
    about: '',
    accepted_pet_types: [],
    imagesProfile: [],
    phone: '',
    specialized_in: [],
    reviewsOfDoctor: [],
    id: ''
  };
  id: any = '';
  myId: any;
  selectedRating: number = 0;
  activeTab: string = 'tab1';
  
  reviewForm: FormGroup = new FormGroup({
    name: new FormControl(null),
    email: new FormControl(null),
    review: new FormControl(null, [Validators.required]),
    rating: new FormControl(null, Validators.required)
  });

  ngOnInit(): void {
    this.getMe();
    this.getId();
    this.getDoctor();
    this.setRating(0);
  }

  setRating(num: number): void {
    this.selectedRating = num;
    this.reviewForm.patchValue({
      rating: this.selectedRating,
    });
  }

  getMe(): void {
    this.userService.getMe().subscribe({
      next: (res) => {
        this.myId = res.data.data._id;
        this.reviewForm.patchValue({
          name: res.data.data.name,
          email: res.data.data.email
        });
      }
    });
  }

  submit(): void {
    this.reviewForm.markAllAsTouched();
    if (this.reviewForm.valid) {
      this.sendReview();
      this.selectedRating = 0;
    }
  }

  sendReview(): void {
    this.reviewsService.createReviewDoctor(this.id, this.reviewForm.value).subscribe({
      next: (res) => {
        this.reviewForm.reset();
        this.getDoctor();
      }
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getDoctor(): void {
    this.vetService.getDoctor(this.id).subscribe({
      next: (res) => {
        this.doctor = res.updatedDoc;
      }
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${month} ${day}, ${year}`;
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.id = res.get('id');
      }
    });
  }

  deleteReview(id: any): void {
    this.reviewsService.deleteRview(id).subscribe({
      next: (res) => {
        this.getDoctor();
      }
    });
  }

  updateReview(rating: number, review: any, id: any): void {
    this.deleteReview(id);
    this.reviewForm.patchValue({
      rating: rating,
      review: review
    });
    this.selectedRating = rating;
  }
}