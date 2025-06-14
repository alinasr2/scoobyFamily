import { Component, inject, OnInit } from '@angular/core';
import { PetsService } from '../../core/services/pets/pets.service';
import { Pet } from '../../shared/interfaces/pet';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-pets',
  imports: [RouterLink,NgClass,TranslatePipe],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.scss'
})
export class PetsComponent implements OnInit{
  petsService = inject(PetsService);
  activatedRoute = inject(ActivatedRoute);
  pets:Pet[] = [];
  favPets:Pet [] =[];
  type:any;
  ngOnInit(): void {
    this.getType();
    this.getFavPets();
    if(this.type == 'dogs'){
      this.getDogs();
    }
    else if(this.type == 'cats'){
      this.getCats();
    }
    else{
      this.getAllPets();
    }
  }
  getAllPets():void{
    this.petsService.getAllPets().subscribe({
      next:(res)=>{
        this.pets = res.data
      }
    })
  }
  getType():void{
    this.activatedRoute.queryParamMap.subscribe({
      next:(res)=>{
        this.type = res.get('type');        
      }
    })
  }
  getCats():void{
    this.petsService.getCats().subscribe({
      next:(res)=>{
        this.pets = res.data
      }
    })
  }
  getDogs():void{
    this.petsService.getDogs().subscribe({
      next:(res)=>{
        this.pets = res.data
      }
    })
  }
  addToFavourite(id:any):void{
    this.petsService.addToFavourite(id).subscribe({
      next:(res)=>{
        this.getFavPets();
      }
    })
  }
  getFavPets():void{
    this.petsService.getFavPets().subscribe({
      next:(res)=>{
        this.favPets = res.data;
      }
    })
  }
  isFavorite(pet:Pet):boolean{
    return this.favPets.some(fav => fav.id == pet.id);
  }
}
