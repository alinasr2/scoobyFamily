import { Component, inject, OnInit } from '@angular/core';
import { ServicesService } from '../../core/services/services/services.service';
import { Service } from '../../shared/interfaces/service';
import { ReusableTableComponent } from '../../shared/components/reusable-table/reusable-table.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-services',
  standalone: true,
  imports: [
    CommonModule,
    ReusableTableComponent,
    DialogModule,
    FormsModule,
    FloatLabelModule,
    DropdownModule,
    TranslatePipe
  ],
  templateUrl: './admin-services.component.html',
  styleUrl: './admin-services.component.scss'
})
export class AdminServicesComponent implements OnInit {
  private readonly servicesService = inject(ServicesService);
  services: Service[] = [];
  visible: boolean = false;
  selectedCity: string = '';
  servicePrice: number | null = null;
  previewImage: string | ArrayBuffer | null = null;
  isButtonDisabled: boolean = true;
  selectedFile: File | null = null;

  // Service Type Options
  serviceTypeOptions = [
    { label: 'Pet Training', value: 'Pet Training' },
    { label: 'Pet Boarding', value: 'Pet Boarding' },
    { label: 'Pet Grooming', value: 'Pet Grooming' },
    { label: 'Pet Sitting', value: 'Pet Sitting' },
    { label: 'Pet Daycare', value: 'Pet Daycare' },
    { label: 'Pet Walking', value: 'Pet Walking' },
    { label: 'Pet Taxi', value: 'Pet Taxi' },
    { label: 'Pet Friendly', value: 'Pet Friendly' }
  ];
  selectedServiceType: any;

  // Price Per Options
  pricePerOptions = [
    { label: 'Day', value: 'day' },
    { label: 'Night', value: 'night' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ];
  selectedPricePer: any;

  columns = [
    { header: 'Service Type', field: 'serviceType', width: '25%' },
    { header: 'Service Rate', field: 'rate', width: '25%' },
    { header: 'Service City', field: 'city', width: '25%' },
    { header: 'Service Image', field: 'serviceImage', width: '25%' },
  ];

  ngOnInit(): void {
    this.getAllServices();
  }

  getAllServices(): void {
    this.servicesService.getAllServices().subscribe({
      next: (res) => {
        this.services = res.shuffledServices;
      }
    });
  }

  showDialog(): void {
    this.visible = true;
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImage = reader.result;
      };
      reader.readAsDataURL(file);
      this.checkInputs();
    }
  }

  checkInputs(): void {
    this.isButtonDisabled = !(
    this.selectedServiceType &&
    this.selectedCity.trim() &&
    this.servicePrice !== null &&
    this.selectedPricePer &&
    this.selectedFile
  );

  }

  addService(): void {
    const formData = new FormData();
    
    // Append text data
    formData.append('serviceType', this.selectedServiceType.value);
    formData.append('city', this.selectedCity);
    formData.append('price', this.servicePrice !== null ? this.servicePrice.toString() : '0');
    formData.append('pricePer', this.selectedPricePer.value);
    
    // Append file if exists
    if (this.selectedFile) {
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }

    // Here you can send the formData to your API
    console.log('FormData content:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.servicesService.createService(formData).subscribe({
      next: (res) => {
        console.log('Service created successfully', res);
        this.resetForm();
        this.getAllServices();
        this.visible = false;
      },
      error: (err) => {
        console.error('Error creating service', err);
      }
    });
    
  }

  resetForm(): void {
    this.selectedServiceType = null;
    this.selectedCity = '';
    this.servicePrice = 0;
    this.selectedPricePer = null;
    this.previewImage = null;
    this.selectedFile = null;
    this.isButtonDisabled = true;
    this.visible = false;
  }
}