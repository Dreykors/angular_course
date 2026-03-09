import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { APP_CONFIG, AppConfig } from '../app-config';

@Injectable()
export class ApiTranslateLoader implements TranslateLoader {
  private http = inject(HttpClient);
  private config = inject<AppConfig>(APP_CONFIG);

  getTranslation(lang: string): Observable<Record<string, string>> {
    return this.http.get<Record<string, string>>(
      `${this.config.apiEndpoint}/translations?lang=${lang}`,
    );
  }
}
