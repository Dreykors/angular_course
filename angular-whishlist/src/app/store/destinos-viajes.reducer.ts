import { createReducer, on } from '@ngrx/store';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { initialDestinosViajesState } from './destinos-viajes.state';
import { addDestino, elegirFavorito, removeDestino } from './destinos-viajes.actions';

function clonarDestino(destino: DestinoViajeModel, selected = false): DestinoViajeModel {
  const nuevo = new DestinoViajeModel(destino.nombre, destino.u);

  if (selected) {
    nuevo.setSelected(true);
  } else {
    nuevo.setSelected(false);
  }

  return nuevo;
}

function removerPrimeraCoincidencia(
  items: DestinoViajeModel[],
  destino: DestinoViajeModel,
): DestinoViajeModel[] {
  let eliminado = false;

  return items.filter((item) => {
    if (!eliminado && item.nombre === destino.nombre && item.u === destino.u) {
      eliminado = true;
      return false;
    }
    return true;
  });
}

export const destinosReducer = createReducer(
  initialDestinosViajesState,

  on(addDestino, (state, { destino }) => ({
    ...state,
    items: [...state.items, clonarDestino(destino)],
  })),

  on(removeDestino, (state, { destino }) => {
    const nuevosItems = removerPrimeraCoincidencia(state.items, destino).map((item) =>
      clonarDestino(item, item.isSelected()),
    );

    const favoritoSigueExistiendo =
      state.favorito != null &&
      nuevosItems.some(
        (item) => item.nombre === state.favorito!.nombre && item.u === state.favorito!.u,
      );

    return {
      ...state,
      items: nuevosItems,
      favorito: favoritoSigueExistiendo ? state.favorito : null,
    };
  }),

  on(elegirFavorito, (state, { destino }) => {
    const nuevosItems = state.items.map((item) =>
      clonarDestino(item, item.nombre === destino.nombre && item.u === destino.u),
    );

    const nuevoFavorito =
      nuevosItems.find((item) => item.nombre === destino.nombre && item.u === destino.u) ?? null;

    return {
      ...state,
      items: nuevosItems,
      favorito: nuevoFavorito,
    };
  }),
);
