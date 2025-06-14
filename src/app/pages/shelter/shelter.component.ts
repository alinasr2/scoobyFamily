import { NgClass, NgFor} from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ShelterService } from '../../core/services/shelter/shelter.service';
import { ShelterInfo } from '../../shared/interfaces/shelter-info';
import { Pet } from '../../shared/interfaces/pet';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PetsService } from '../../core/services/pets/pets.service';
import { ReviewsService } from '../../core/services/reviews/reviews.service';
import { UserService } from '../../core/services/user/user.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-shelter',
  imports: [ReactiveFormsModule, CarouselModule, NgFor, NgClass , RouterLink,TranslatePipe],
  templateUrl: './shelter.component.html',
  styleUrl: './shelter.component.scss',
  schemas: []
})
export class ShelterComponent implements OnInit {
  private readonly shelterService = inject(ShelterService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly petsService = inject(PetsService);
  private readonly reviewsService = inject(ReviewsService);
  private readonly userService = inject(UserService);
  
  shelter: ShelterInfo =  {
    locations: {
      coordinates: [],
      address: '',
      type: ''
    },
    _id: '',
    shelterName: '',
    shelterImage: '',
    shelterNumber: '',
    description: '',
    rate: 0,
    numberOfRates: 0,
    pets_Id: [],
    createdAt: '',
    updatedAt: '',
    __v: 0,
    about: '',
    shelterImages: [],
    reviewsOfShelter: [],
    id: ''
  };
  pets: Pet[] = [];
  favPets: Pet[] = [];
  id: any = '';
  myId: any;
  selectedRating: number = 0;

  reviewForm: FormGroup = new FormGroup({
    review: new FormControl(null, [Validators.required]),
    rating: new FormControl(null, Validators.required)
  });

  customOptions: OwlOptions = {
    rtl: true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 15,
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
    this.getMe();
    this.getFavPets();
    this.getId();
    this.getPetsInShelter();
    this.getShelter();
    this.setRating(0);
  }

  getMe(): void {
    this.userService.getMe().subscribe({
      next: (res) => {
        this.myId = res.data.data._id;
      }
    });
  }

  setRating(num: number): void {
    this.selectedRating = num;
    this.reviewForm.patchValue({
      rating: this.selectedRating,
    });
  }

  getShelter(): void {
    this.shelterService.getShelter(this.id).subscribe({
      next: (res) => {
        this.shelter = res;
      }
    });
  }

  getPetsInShelter(): void {
    this.shelterService.petsInShelter(this.id).subscribe({
      next: (res) => {
        this.pets = res;
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

  submit(): void {
    this.reviewForm.markAllAsTouched();
    if (this.reviewForm.valid) {
      this.sendReview();
      this.selectedRating = 0;
    }
  }

  sendReview(): void {
    this.reviewsService.createReviewShelter(this.id, this.reviewForm.value).subscribe({
      next: (res) => {
        this.reviewForm.reset();
        this.getShelter();
      },
      error: (err) => {
        console.error('Error submitting review:', err);
      }
    });
  }

  getId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.id = res.get(`id`);
      }
    });
  }

  getFavPets(): void {
    this.petsService.getFavPets().subscribe({
      next: (res) => {
        this.favPets = res.data;
      }
    });
  }

  addToFavourite(id: any): void {
    this.petsService.addToFavourite(id).subscribe({
      next: (res) => {
        this.getFavPets();
      }
    });
  }

  isFavorite(pet: Pet): boolean {
    return this.favPets.some(fav => fav.id == pet.id);
  }

  deleteReview(id: any): void {
    this.reviewsService.deleteRview(id).subscribe({
      next: (res) => {
        this.getShelter();
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