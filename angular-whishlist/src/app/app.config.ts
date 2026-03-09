import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { routes } from './app.routes';
import { destinosReducer } from './store/destinos-viajes.reducer';
import { DestinosViajesEffects } from './store/destinos-viajes.effects';
import { APP_CONFIG, APP_CONFIG_VALUE } from './app-config';
import { ApiTranslateLoader } from './i18n/api-translate-loader';

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

    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'es',
        loader: {
          provide: TranslateLoader,
          useClass: ApiTranslateLoader,
          deps: [APP_CONFIG],
        },
      }),
    ),
  ],
};
