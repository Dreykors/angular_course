import { createAction, props } from '@ngrx/store';
import { DestinoViajeModel } from '../models/destino-viaje.model';

export const addDestino = createAction(
  '[Destinos] Add Destino',
  props<{ destino: DestinoViajeModel }>(),
);

export const removeDestino = createAction(
  '[Destinos] Remove Destino',
  props<{ destino: DestinoViajeModel }>(),
);

export const elegirFavorito = createAction(
  '[Destinos] Elegir Favorito',
  props<{ destino: DestinoViajeModel }>(),
);
