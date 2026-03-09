import { Inject, Injectable } from '@angular/core';
import { ReservasApiClient } from './reservas-api-client';
import { RESERVAS_CONFIG, ReservasConfig } from './reservas-config';

@Injectable()
export class ReservasApiClientDecorated extends ReservasApiClient {
  constructor(@Inject(RESERVAS_CONFIG) private config: ReservasConfig) {
    super();
  }

  override getAll() {
    console.log('Llamando por la clase decorada. Config:', this.config.apiEndpoint);
    return super.getAll();
  }
}
