import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { DestinoViaje } from '../destino-viaje/destino-viaje';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import { DestinosApiClient } from '../models/destinos-api-client';

import { AppState } from '../store/destinos-viajes.state';
import { selectDestinosFavorito, selectDestinosItems } from '../store/destinos-viajes.selectors';
import { removeDestino, resetVotes } from '../store/destinos-viajes.actions';

@Component({
  selector: 'app-lista-destinos',
  standalone: true,
  imports: [CommonModule, DestinoViaje, FormDestinoViaje],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css',
})
export class ListaDestinos {
  @Output() onItemAdded = new EventEmitter<DestinoViajeModel>();

  private store = inject(Store<AppState>);
  private destinosApiClient = inject(DestinosApiClient);

  destinos$ = this.store.select(selectDestinosItems);
  updates: string[] = [];

  constructor() {
    this.store.select(selectDestinosFavorito).subscribe((fav) => {
      if (fav != null) {
        this.updates.push('Se ha elegido a ' + fav.nombre);
      }
    });
  }

  agregado(d: DestinoViajeModel): void {
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
  }

  elegido(d: DestinoViajeModel): void {
    this.destinosApiClient.elegir(d);
  }

  borrado(d: DestinoViajeModel): void {
    this.store.dispatch(removeDestino({ destino: d }));
  }

  resetearVotos(): void {
    this.store.dispatch(resetVotes());
  }
}
