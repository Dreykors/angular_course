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

export const voteUp = createAction('[Destinos] Vote Up', props<{ destino: DestinoViajeModel }>());

export const voteDown = createAction(
  '[Destinos] Vote Down',
  props<{ destino: DestinoViajeModel }>(),
);

export const resetVotes = createAction('[Destinos] Reset Votes');

export const trackTagClick = createAction('[Tracking] Track Tag Click', props<{ tag: string }>());

export const initFromDexie = createAction(
  '[Destinos] Init From Dexie',
  props<{ destinos: DestinoViajeModel[] }>(),
);
