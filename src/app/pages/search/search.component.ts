import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServicesService } from '../../core/services/services/services.service';
import { Service } from '../../shared/interfaces/service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {

  servicesService = inject(ServicesService);
  services:Service[] = [];
  search:FormGroup = new FormGroup({
    serviceType: new FormControl(null),
    location: new FormControl(null),
  })
topRatedServices: any;

  searchService():void{
    this.servicesService.search(this.search.value.location,this.search.value.serviceType).subscribe({
      next:(res)=>{
        this.services = res.shuffledServices;
      }
    })
    
  }
}
