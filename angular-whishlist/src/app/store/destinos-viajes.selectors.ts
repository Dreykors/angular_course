import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DestinosViajesState } from './destinos-viajes.state';

export const selectDestinosState = createFeatureSelector<DestinosViajesState>('destinos');

export const selectDestinosItems = createSelector(selectDestinosState, (state) => state.items);

export const selectDestinosFavorito = createSelector(
  selectDestinosState,
  (state) => state.favorito,
);
