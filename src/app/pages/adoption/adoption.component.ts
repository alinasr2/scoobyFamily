import { Component, OnInit } from '@angular/core';
import { PetsService } from '../../core/services/pets/pets.service';
import { ShelterService } from '../../core/services/shelter/shelter.service';
import { Pet } from '../../shared/interfaces/pet';
import { Shelter } from '../../shared/interfaces/shelter';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgClass, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SliderBlogComponent } from "../../shared/components/slider-blog/slider-blog.component";
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-adoption',
  imports: [CarouselModule, NgClass, RouterLink, NgFor, SliderBlogComponent,TranslatePipe],
  templateUrl: './adoption.component.html',
  styleUrls: ['./adoption.component.scss']
})
export class AdoptionComponent implements OnInit {
  pets: Pet[] = [];
  favPets: Pet[] = [];
  topCollectionDogs: Pet[] = [];
  topCollectionCats: Pet[] = [];
  catsForKids: Pet[] = [];
  dogsForKids: Pet[] = [];
  successAdaped: Pet[] = [];
  shelters: Shelter[] = [];
  slider: number = 0;

  adoption: OwlOptions = {
    loop: true,
    rtl: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin: 20,
    navSpeed: 700,
    autoplay: true,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      400: { items: 2 },
      740: { items: 3 },
      940: { items: 4 }
    },
    nav: true
  }

  constructor(
    private petsService: PetsService,
    private shelterService: ShelterService
  ) {}

  ngOnInit(): void {
    this.loadAllData();
  }

  async loadAllData() {
    try {
      const [
        pets, 
        favorites,
        topDogs, 
        topCats,
        dogsKids,
        catsKids,
        successStories,
        shelterList
      ] = await Promise.all([
        this.petsService.getTopCollection().toPromise(),
        this.petsService.getFavPets().toPromise(),
        this.petsService.getTopCollectionDogs().toPromise(),
        this.petsService.getTopCollectionCats().toPromise(),
        this.petsService.getDogsForKids().toPromise(),
        this.petsService.getCatsForKids().toPromise(),
        this.petsService.getSuccessAdaped().toPromise(),
        this.shelterService.getAllShelters().toPromise()
      ]);

      this.pets = pets?.data || [];
      this.favPets = favorites?.data || [];
      this.topCollectionDogs = topDogs?.data || [];
      this.topCollectionCats = topCats?.data || [];
      this.dogsForKids = dogsKids?.data || [];
      this.catsForKids = catsKids?.data || [];
      this.successAdaped = successStories?.data || [];
      this.shelters = shelterList?.allShelters || [];
    } catch (error) {
    }
  }

  addToFavourite(id: string): void {
    this.petsService.addToFavourite(id).subscribe({
      next: (res) => {
        this.getFavPets();
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

  isFavorite(pet: Pet): boolean {
    return this.favPets.some(fav => fav._id === pet._id);
  }
}