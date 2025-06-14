import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const blankGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  let ID = inject(PLATFORM_ID);
  let token;
  if (isPlatformBrowser(ID)) {
    token = localStorage.getItem('token');
  }
  
  if (token) {
    const isExpired = isTokenExpired(token);
    if (!isExpired) {
      return true;
    } else {
    if (isPlatformBrowser(ID)) {
      localStorage.removeItem('token');
    }
      router.navigate(['/login']);
      return false;
    }
  } else {
    router.navigate(['/login']);
    return false;
  }
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

// export const blankGuard: CanActivateFn = (route, state) => {
//   let router = inject(Router);
//   if (localStorage.getItem("token")) {
//     return true;
//   }
//   else{
//     router.navigate(['/login']);
//     return false;
//   }
// };
