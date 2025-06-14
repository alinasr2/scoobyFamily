import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user/user.service';
import { User } from '../../shared/interfaces/service-profile';
import { ReusableTableComponent } from "../../shared/components/reusable-table/reusable-table.component";
import { Dialog } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    ReusableTableComponent,
    Dialog,
    ButtonModule,
    InputTextModule,
    FloatLabel,
    FormsModule,
    DropdownModule,
    TranslatePipe
  ],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit {
  private readonly userService = inject(UserService);
  private readonly authenticationService = inject(AuthenticationService);
  visible: boolean = false;
  users: User[] = [];
  name: string = '';
  email: string = '';
  password: string = '';
  selectedRole: string = '';
  roles: string[] = ['admin', 'user'];
  
  isButtonDisabled: boolean = true;

  columns = [
    { header: 'User Name', field: 'name', width: '20%' },
    { header: 'Email', field: 'email', width: '20%' },
    { header: 'Role', field: 'role', width: '20%' },
    { header: 'Join In', field: 'createdAt', width: '20%' },
  ];

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUser().subscribe({
      next: (res) => {
        this.users = res.data;
      }
    });
  }

  showDialog(): void {
    this.visible = true;
  }
    
  checkInputs(): void {
    this.isButtonDisabled = !(
      this.name.trim() && 
      this.email.trim() && 
      this.password.trim() && 
      this.selectedRole
    );
  }

  createUser(): void {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.selectedRole
    };
    this.authenticationService.signUp(userData).subscribe({
      next: (res) => {
        this.resetForm();
        this.getAllUsers();
      }
    });
  }

  resetForm(): void {
    this.name = '';
    this.email = '';
    this.password = '';
    this.selectedRole = '';
    this.isButtonDisabled = true;
    this.visible = false;
  }
}