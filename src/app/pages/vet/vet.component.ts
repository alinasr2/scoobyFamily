import { Component, inject, OnInit } from '@angular/core';
import { SliderBlogComponent } from "../../shared/components/slider-blog/slider-blog.component";
import { VetService } from '../../core/services/vet/vet.service';
import { Doctor } from '../../shared/interfaces/doctor';
import { Clinic } from '../../shared/interfaces/clinic';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-vet',
  imports: [SliderBlogComponent,RouterLink,TranslatePipe],
  templateUrl: './vet.component.html',
  styleUrl: './vet.component.scss'
})
export class VetComponent implements OnInit {
  private readonly vetService = inject(VetService);
  private readonly activatedRoute = inject(ActivatedRoute);
  doctors:Doctor[] = [];
  clinics:Clinic[] = [];
  type:string = '';

  ngOnInit(): void {
    this.getCategory();
      this.getAllDoctors();
      this.getAllClinics();
  }
  getAllDoctors():void{
    this.vetService.getAllDoctors().subscribe({
      next:(res)=>{
        this.doctors = res.doctors;
      },
    })
  }
  getAllClinics():void{
    this.vetService.getAllClicnics().subscribe({
      next:(res)=>{
        this.clinics = res.data;
      }
    })
  }
  getCategory():void{
    this.activatedRoute.queryParams.subscribe(params => {
      const category = params['type'];
      this.type = category;
    });
  }
}
