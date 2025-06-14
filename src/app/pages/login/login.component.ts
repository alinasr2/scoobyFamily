import { Component, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { TranslatePipe } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  showPassword = false;
  authenticationService = inject(AuthenticationService);
  private ID = inject(PLATFORM_ID);
  message:string="";
  router = inject(Router);
  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });
  submit():void{
    this.login.markAllAsTouched();
    
    if (this.login.valid) {
      this.authenticationService.login(this.login.value).subscribe({
        next:(res)=>{
          if(res.status == "success"){
            if (isPlatformBrowser(this.ID)) {
              localStorage.setItem("token",res.token)
            }
            this.router.navigate(['/home'])
          }
        },
        error:(err)=>{
          this.message = err.error.message;
        }
      })
    }
    
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
