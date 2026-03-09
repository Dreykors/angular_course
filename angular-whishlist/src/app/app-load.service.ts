import { Injectable } from '@angular/core';
import { DestinosApiClient } from './models/destinos-api-client';

@Injectable({
  providedIn: 'root',
})
export class AppLoadService {
  constructor(private destinosApiClient: DestinosApiClient) {}

  async initializeDestinosViajesState(): Promise<void> {
    await this.destinosApiClient.getAll();
  }
}
