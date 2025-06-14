import { Component, inject, PLATFORM_ID } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink,TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  showPassword = false;
  showConfirmPassword = false;
  authenticationService = inject(AuthenticationService);
  router = inject(Router);
  private ID:any = inject(PLATFORM_ID);
  message:string="";
  register: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl(null, [Validators.required])
  }, {validators: this.confirmPassword});
  submit():void{
    this.register.markAllAsTouched();
    if(this.register.valid){
      this.authenticationService.signUp(this.register.value).subscribe({
        next:(res)=>{
          if (isPlatformBrowser(this.ID)) {
            localStorage.setItem("token",res.token)
          }
          if(res.status == "success"){
            this.router.navigate(['/home'])
          }
        },
        error:(err)=>{
          this.message = err.error.message;
        }
      })
    }
  }
  confirmPassword(group:AbstractControl){
    const password = group.get("password")?.value;
    const rePassword = group.get("rePassword")?.value;
    if(password == rePassword){
      return null;
    }
    else{
      return {mismatch:true};
    }
  }
    togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
