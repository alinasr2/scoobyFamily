import { AuthenticationService } from './../../core/services/authentication/authentication.service';
import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule,TranslatePipe],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
showPassword = false;
  showConfirmPassword = false;
  steps = signal(1);
  message:string=""
  userId:any = '';

  router = inject(Router);
  authenticationService = inject(AuthenticationService);

  forgotPassword:FormGroup = new FormGroup({
    email: new FormControl(null , [Validators.email , Validators.required]),
  });
  checkCodeForm:FormGroup = new FormGroup({
    code: new FormControl(null,[Validators.required])
  });
  passwordForm:FormGroup = new FormGroup({
    password: new FormControl(null),
    confirmPassword: new FormControl(null),
  },{validators: this.confirmpassword})

  confirmpassword(group:AbstractControl){
    const password = group.get("password")?.value;
    const rePassword = group.get("confirmPassword")?.value;
    if(password == rePassword){
      return null;
    }
    else{
      return {mismatch:true};
    }
  }

  submitEmail():void{
    this.forgotPassword.markAllAsTouched();
    if(this.forgotPassword.valid){
      this.authenticationService.forgotPassword(this.forgotPassword.value).subscribe({
        next:(res)=>{
          this.steps.set(2);
          this.message = '';
        },
        error:(err)=>{
          this.message = err.error.message;
          
        }
      })
    }
    
  }

  verifyCode():void{
    this.checkCodeForm.markAllAsTouched();
    if(this.checkCodeForm.valid){
      this.authenticationService.checkCode(this.checkCodeForm.value).subscribe({
        next:(res)=>{
          this.userId = res.userId;
          this.steps.set(3);
          this.message = '';
        },
        error:(err)=>{
          this.message = err.error.message;
        }
      })
    }
  }

  setPassword():void{
    this.passwordForm.markAllAsTouched();
    if(this.passwordForm.valid){
      this.authenticationService.resetPassword(this.userId,this.passwordForm.value).subscribe({
        next:(res)=>{
          if(res.status == "success"){
            this.router.navigate(['/login']);
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

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
