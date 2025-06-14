import { Component, inject, OnInit } from '@angular/core';
import { VetService } from '../../core/services/vet/vet.service';
import { Doctor } from '../../shared/interfaces/doctor';
import { ReusableTableComponent } from "../../shared/components/reusable-table/reusable-table.component";
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { MultiSelectModule } from 'primeng/multiselect';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-doctors',
  imports: [
    NgFor,
    ReusableTableComponent, 
    Dialog, 
    ButtonModule, 
    MultiSelectModule,
    InputTextModule, 
    FloatLabel, 
    FormsModule, 
    NgIf,
    ChipsModule,
    DropdownModule,
    FileUploadModule,
    TranslatePipe
  ],
  templateUrl: './admin-doctors.component.html',
  styleUrl: './admin-doctors.component.scss'
})
export class AdminDoctorsComponent implements OnInit {
  private readonly vetService = inject(VetService);
  visible: boolean = false;
  doctors: Doctor[] = [];

  name: string = '';
  rate: number | null = null;
  numberOfRate: number | null = null;
  phone: string = '';
  description: string = '';
  about: string = '';
  specialized_in: string[] = [];
  acceptedPetTypes: string[] = [];
  mainImageFile: File | null = null;
  profileImageFiles: File[] = [];
  previewImage: string | ArrayBuffer | null = null;
  isButtonDisabled: boolean = true;

  petTypes = [
    { label: 'Dogs', value: 'Dogs' },
    { label: 'Cats', value: 'Cats' }
  ];

  columns = [
    { header: 'Doctor Name', field: 'name', width: '34%' },
    { header: 'Doctor Rate', field: 'rate', width: '33%' },
    { header: 'Doctor Image', field: 'doctorImage', width: '33%' },
  ];

  ngOnInit(): void {
    this.getAllDoctors();
  }

  getAllDoctors(): void {
    this.vetService.getAllDoctors().subscribe({
      next: (res) => {
        this.doctors = res.doctors;
      }
    });
  }

  showDialog() {
    this.visible = true;
  }

  checkInputs(): void {
    const allFieldsFilled = 
      this.name.trim() !== '' && 
      this.rate !== null && this.rate >= 0 && this.rate <= 5 &&
      this.numberOfRate !== null && this.numberOfRate >= 0 &&
      this.phone.trim() !== '' &&
      this.description.trim() !== '' &&
      this.about.trim() !== '' &&
      this.specialized_in.length > 0 &&
      this.acceptedPetTypes.length > 0 &&
      this.mainImageFile !== null &&
      this.profileImageFiles.length > 0;

    this.isButtonDisabled = !allFieldsFilled;
  }

  createDoctor(): void {
    if (this.isButtonDisabled) return;

    const form = new FormData();
    form.append('name', this.name);
    form.append('rate', this.rate!.toString());
    form.append('numberOfRate', this.numberOfRate!.toString());
    form.append('phone', this.phone);
    form.append('description', this.description);
    form.append('about', this.about);
    form.append('specialized_in', this.specialized_in.join(','));
    form.append('accepted_pet_types', this.acceptedPetTypes.join(',')); 

    if (this.mainImageFile) {
      form.append('doctorImage', this.mainImageFile, this.mainImageFile.name);
    }

    this.profileImageFiles.forEach((file) => {
      form.append('imagesProfile', file, file.name);
    });

    this.vetService.createDoctor(form).subscribe({
      next: (res) => {
        console.log(res);
        this.resetForm();
        this.getAllDoctors();
      }
    });
  }

  onMainImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.mainImageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
      this.checkInputs();
    }
  }

  onProfileImagesSelected(event: any): void {
    this.profileImageFiles = Array.from(event.files);
    this.checkInputs();
  }

  onProfileImagesRemoved(event: any): void {
    this.profileImageFiles = Array.from(event.files);
    this.checkInputs();
  }

  resetForm(): void {
    this.name = '';
    this.rate = null;
    this.numberOfRate = null;
    this.phone = '';
    this.description = '';
    this.about = '';
    this.specialized_in = [];
    this.acceptedPetTypes = [];
    this.mainImageFile = null;
    this.profileImageFiles = [];
    this.previewImage = null;
    this.isButtonDisabled = true;
    this.visible = false;
  }
}
