import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { destinosReducer } from './store/destinos-viajes.reducer';
import { DestinosViajesEffects } from './store/destinos-viajes.effects';
import { APP_CONFIG, APP_CONFIG_VALUE } from './app-config';
import { AppLoadService } from './app-load.service';

export function initApp(appLoadService: AppLoadService) {
  return () => appLoadService.initializeDestinosViajesState();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      destinos: destinosReducer,
    }),
    provideEffects([DestinosViajesEffects]),
    provideStoreDevtools({
      maxAge: 25,
    }),
    {
      provide: APP_CONFIG,
      useValue: APP_CONFIG_VALUE,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [AppLoadService],
      multi: true,
    },
  ],
};
