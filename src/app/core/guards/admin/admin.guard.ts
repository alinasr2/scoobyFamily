import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp;
    return (Math.floor(Date.now() / 1000)) > expiry;
  } catch (e) {
    return true;
  }
}

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  let ID:any = inject(PLATFORM_ID);
  let token;
  if (isPlatformBrowser(ID)) {
    token = localStorage.getItem('token');
  }

  if (token && !isTokenExpired(token)) {
    return userService.getMe().pipe(
      map(user => {
        const role = user?.data?.data?.role;
        if (role === 'admin') {
          return true;
        } else {
          router.navigate(['/profile']);
          return false;
        }
      }),
      catchError(err => {
        router.navigate(['/login']);
        return of(false);
      })
    );
  } else {
    router.navigate(['/login']);
    return of(false); 
  }
};
