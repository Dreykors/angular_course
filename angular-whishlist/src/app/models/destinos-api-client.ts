import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { APP_CONFIG, AppConfig } from '../app-config';
import { AppState } from '../store/destinos-viajes.state';
import { addDestino, elegirFavorito, initMyData } from '../store/destinos-viajes.actions';
import { DestinoViajeModel } from './destino-viaje.model';
import { db } from '../db/my-database';

@Injectable({
  providedIn: 'root',
})
export class DestinosApiClient {
  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    @Inject(APP_CONFIG) private config: AppConfig,
  ) {}

  async getAll(): Promise<void> {
    const headers = new HttpHeaders({
      Authorization: 'token-demo',
    });

    const data = await firstValueFrom(
      this.http.get<string[]>(`${this.config.apiEndpoint}/my`, {
        headers,
      }),
    );

    this.store.dispatch(initMyData({ destinos: data }));
  }

  add(d: DestinoViajeModel): void {
    const headers = new HttpHeaders({
      Authorization: 'token-demo',
    });

    this.http
      .post<{
        status: number;
        data: string[];
      }>(`${this.config.apiEndpoint}/my`, { nuevo: d.nombre }, { headers })
      .subscribe(async (response) => {
        if (response.status === 200) {
          this.store.dispatch(addDestino({ destino: d }));
          this.store.dispatch(elegirFavorito({ destino: d }));

          await db.destinos.add({
            nombre: d.nombre,
            u: d.u,
            servicios: [...d.servicios],
            votes: d.votes,
            selected: d.isSelected(),
          });

          const all = await db.destinos.toArray();
          console.log('Contenido DB local', all);
        }
      });
  }

  elegir(d: DestinoViajeModel): void {
    this.store.dispatch(elegirFavorito({ destino: d }));
  }
}
