import { NgxSpinnerModule } from 'ngx-spinner';
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { headersInterceptor } from './core/interceptors/headers/headers.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader'


export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http, '/i18n/', '.json');
 }
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes , withInMemoryScrolling({scrollPositionRestoration:'top'})), 
    provideHttpClient(withFetch(),withInterceptors([loadingInterceptor,headersInterceptor])), 
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    }),
    importProvidersFrom(NgxSpinnerModule,BrowserAnimationsModule,TranslateModule.forRoot({
      defaultLanguage:'en',
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    }))
  ]
};





/*

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes , withInMemoryScrolling({scrollPositionRestoration:'top'})), 
    provideHttpClient(withFetch()), 
    provideClientHydration(withEventReplay())
    
  ]
};


*/