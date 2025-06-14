import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ServiceProfileService } from '../../core/services/serviceProfile/service-profile.service';
import { ServiceProfile } from '../../shared/interfaces/service-profile';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-services',
  imports: [RouterLink,TranslatePipe],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent implements OnInit {
  private readonly serviceProfileService = inject(ServiceProfileService);
  servicesProfile:ServiceProfile[] = [] ;
  ngOnInit(): void {
    this.getAllServicesProfile();
  }
  getAllServicesProfile():void{
    this.serviceProfileService.GetAllServiceProfile().subscribe({
      next:(res)=>{
        this.servicesProfile = res.data;
      }
    })
  }
}
