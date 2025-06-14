import { Component, inject, OnInit } from '@angular/core';
import { VetService } from '../../core/services/vet/vet.service';
import { Clinic } from '../../shared/interfaces/clinic';
import { ReusableTableComponent } from "../../shared/components/reusable-table/reusable-table.component";


@Component({
  selector: 'app-admin-clinic',
  standalone: true,
  imports: [
    ReusableTableComponent,],
  templateUrl: './admin-clinic.component.html',
  styleUrl: './admin-clinic.component.scss'
})
export class AdminClinicComponent implements OnInit {
  private readonly vetService = inject(VetService);
  visible: boolean = false;
  clinics: Clinic[] = [];
  

  columns = [
    { header: 'Clinic Name', field: 'vetName', width: '34%' },
    { header: 'Clinic Rate', field: 'rate', width: '33%' },
    { header: 'Clinic Image', field: 'vetImage', width: '33%' },
  ];

  ngOnInit(): void {
    this.getAllClinics();
  }

  getAllClinics(): void {
    this.vetService.getAllClicnics().subscribe({
      next: (res) => {
        this.clinics = res.data;
      }
    });
  }

}