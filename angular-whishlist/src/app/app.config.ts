import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { destinosReducer } from './store/destinos-viajes.reducer';
import { DestinosViajesEffects } from './store/destinos-viajes.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      destinos: destinosReducer,
    }),
    provideEffects([DestinosViajesEffects]),
    provideStoreDevtools({
      maxAge: 25,
    }),
  ],
};
