import { Component, inject, OnInit } from '@angular/core';
import { SliderBlogComponent } from "../../shared/components/slider-blog/slider-blog.component";
import { RouterLink } from '@angular/router';
import { ServiceProfileService } from '../../core/services/serviceProfile/service-profile.service';
import { ServiceProfile } from '../../shared/interfaces/service-profile';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  imports: [SliderBlogComponent,RouterLink,TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  private readonly serviceProfileService = inject(ServiceProfileService);

  servicesProfiles:ServiceProfile[] = [];


  ngOnInit(): void {
    this.getAllServiceProfile();
  }

  getAllServiceProfile():void{
    this.serviceProfileService.GetAllServiceProfile().subscribe({
      next:(res)=>{
        this.servicesProfiles = res.data        
      }
    })
  }
}
