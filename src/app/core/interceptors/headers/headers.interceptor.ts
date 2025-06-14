import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  let ID:any = inject(PLATFORM_ID);

  if (isPlatformBrowser(ID)) {
    if (localStorage.getItem('token')) {
      req = req.clone({
        setHeaders:{
          'Authorization' :`Bearer ${localStorage.getItem('token')}`
        }
      });
    }
  }
  return next(req);
};
