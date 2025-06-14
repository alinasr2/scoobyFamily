import { Component, inject, OnInit } from '@angular/core';
import { VetService } from '../../core/services/vet/vet.service';
import { ActivatedRoute } from '@angular/router';
import { Clinic } from '../../shared/interfaces/clinic';
import { NgStyle, NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-clinic',
  imports: [NgStyle, NgIf,TranslatePipe],
  templateUrl: './clinic.component.html',
  styleUrl: './clinic.component.scss'
})
export class ClinicComponent implements OnInit {
  private vetService = inject(VetService);
  private activatedRoute = inject(ActivatedRoute);
  Id: any;
  clinic: Clinic | null = null;
  error: string | null = null;

  ngOnInit(): void {
    this.getClinicId();
    this.getClinic();
  }

  getClinicId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.Id = res.get('id');        
      }
    })
  }

  getClinic(): void {
    this.error = null;
    
    this.vetService.getClinic(this.Id).subscribe({
      next: (res) => {
        this.clinic = res.data?.data || null;
      }
    });
  }

  getRate(): number {
    return this.clinic?.rate || 0;
  }

  getNumberOfReviews(): any {
    return this.clinic?.numberOfRate || 0;
  }
}