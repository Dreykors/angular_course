import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ReservasApiClient } from './reservas-api-client';
import { ReservasApiClientViejo } from './reservas-api-client-viejo';
import { RESERVAS_CONFIG, RESERVAS_CONFIG_VALUE, ReservasConfig } from './reservas-config';
import { ReservasApiClientDecorated } from './reservas-api-client-decorated';

@Component({
  selector: 'app-reservas-listado',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reservas-listado.html',
  styleUrl: './reservas-listado.css',
  providers: [
    {
      provide: RESERVAS_CONFIG,
      useValue: RESERVAS_CONFIG_VALUE,
    },
    {
      provide: ReservasApiClient,
      useClass: ReservasApiClientDecorated,
    },
    {
      provide: ReservasApiClientViejo,
      useExisting: ReservasApiClient,
    },
  ],
})
export class ReservasListado {
  constructor(
    public api: ReservasApiClient,
    public apiViejo: ReservasApiClientViejo,
    @Inject(RESERVAS_CONFIG) public config: ReservasConfig,
  ) {}

  get reservas() {
    return this.api.getAll();
  }

  get reservasViejas() {
    return this.apiViejo.getAll();
  }
}
