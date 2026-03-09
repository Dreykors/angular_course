import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { DestinoViajeModel } from './destino-viaje.model';
import { AppState } from '../store/destinos-viajes.state';
import {
  addDestino,
  elegirFavorito,
  voteUp,
  voteDown,
  resetVotes,
} from '../store/destinos-viajes.actions';
import { APP_CONFIG, AppConfig } from '../app-config';

@Injectable({
  providedIn: 'root',
})
export class DestinosApiClient {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    @Inject(APP_CONFIG) private config: AppConfig,
  ) {}

  add(d: DestinoViajeModel): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.http
      .post<{
        status: number;
        data: string[];
      }>(`${this.config.apiEndpoint}/my`, { nuevo: d.nombre }, { headers })
      .subscribe((resp) => {
        if (resp?.status === 200) {
          this.store.dispatch(addDestino({ destino: d }));
        }
      });
  }

  elegir(d: DestinoViajeModel): void {
    this.store.dispatch(elegirFavorito({ destino: d }));
  }

  votarPositivo(d: DestinoViajeModel): void {
    this.store.dispatch(voteUp({ destino: d }));
  }

  votarNegativo(d: DestinoViajeModel): void {
    this.store.dispatch(voteDown({ destino: d }));
  }

  resetearVotos(): void {
    this.store.dispatch(resetVotes());
  }
}
