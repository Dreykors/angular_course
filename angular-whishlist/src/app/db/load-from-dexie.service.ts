import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { db } from './my-database';
import { AppState } from '../store/destinos-viajes.state';
import { initFromDexie } from '../store/destinos-viajes.actions';
import { DestinoViajeModel } from '../models/destino-viaje.model';

@Injectable({
  providedIn: 'root',
})
export class LoadFromDexieService {
  constructor(private store: Store<AppState>) {}

  async load(): Promise<void> {
    const destinosGuardados = await db.destinos.toArray();

    const destinos = destinosGuardados.map((item) => {
      const destino = new DestinoViajeModel(item.nombre, item.u, item.votes);
      destino.servicios = item.servicios ?? ['piscina', 'desayuno'];
      destino.setSelected(item.selected ?? false);
      return destino;
    });

    this.store.dispatch(initFromDexie({ destinos }));
  }
}
