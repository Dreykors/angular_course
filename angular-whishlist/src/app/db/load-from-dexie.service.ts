import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/destinos-viajes.state';
import { initFromDexie } from '../store/destinos-viajes.actions';
import { db, DestinoViajeRecord } from './my-database';
import { DestinoViajeModel } from '../models/destino-viaje.model';

@Injectable({
  providedIn: 'root',
})
export class LoadFromDexieService {
  private store = inject(Store<AppState>);

  async load(): Promise<void> {
    const records: DestinoViajeRecord[] = await db.destinos.toArray();

    const destinos: DestinoViajeModel[] = records.map((r) => {
      const url =
        (r as any).url ?? (r as any).imagenUrl ?? (r as any).u ?? 'https://picsum.photos/600/350';

      const d = new DestinoViajeModel(r.nombre, url);

      if (typeof (r as any).votes === 'number') {
        d.votes = (r as any).votes;
      }

      if ((r as any).selected) {
        d.setSelected(true);
      }

      return d;
    });

    this.store.dispatch(initFromDexie({ destinos }));
  }
}
