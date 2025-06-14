import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let ID = inject(PLATFORM_ID);
  let token;
  if (isPlatformBrowser(ID)) {
      token = localStorage.getItem('token');
  }
  if (token) {
    const tokenExpired = isTokenExpired(token);
    if (tokenExpired) {
      if (isPlatformBrowser(ID)) {
        localStorage.removeItem('token');
      }
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  }
  return true;
};

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp) {
      return Date.now() >= payload.exp * 1000;
    }
    return false;
  } catch {
    return true;
  }
}







// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   let router = inject(Router);
//   if (localStorage.getItem("token")) {
//     router.navigate(['/home']);
//     return false;
//   }
//   else{
    
//     return true;

//   }
// };
