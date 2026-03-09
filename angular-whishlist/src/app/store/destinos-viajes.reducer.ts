import { createReducer, on } from '@ngrx/store';

import { DestinoViajeModel } from '../models/destino-viaje.model';
import { initialDestinosViajesState } from './destinos-viajes.state';
import {
  addDestino,
  removeDestino,
  elegirFavorito,
  voteUp,
  voteDown,
  resetVotes,
  trackTagClick,
  initFromDexie,
} from './destinos-viajes.actions';

function clonarDestino(destino: DestinoViajeModel, selected = false): DestinoViajeModel {
  const nuevo = new DestinoViajeModel(destino.nombre, destino.u);

  nuevo.votes = destino.votes ?? 0;
  nuevo.setSelected(selected);

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
      state.favorito !== null &&
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
    const nuevosItems = state.items.map((item) => {
      const esFavorito = item.nombre === destino.nombre && item.u === destino.u;
      return clonarDestino(item, esFavorito);
    });

    const nuevoFavorito =
      nuevosItems.find((item) => item.nombre === destino.nombre && item.u === destino.u) ?? null;

    return {
      ...state,
      items: nuevosItems,
      favorito: nuevoFavorito,
    };
  }),

  on(voteUp, (state, { destino }) => {
    const nuevosItems = state.items.map((item) => {
      const nuevo = clonarDestino(item, item.isSelected());

      if (item.nombre === destino.nombre && item.u === destino.u) {
        nuevo.voteUp();
      }

      return nuevo;
    });

    const nuevoFavorito =
      state.favorito &&
      nuevosItems.find(
        (item) => item.nombre === state.favorito!.nombre && item.u === state.favorito!.u,
      );

    return {
      ...state,
      items: nuevosItems,
      favorito: nuevoFavorito ?? state.favorito,
    };
  }),

  on(voteDown, (state, { destino }) => {
    const nuevosItems = state.items.map((item) => {
      const nuevo = clonarDestino(item, item.isSelected());

      if (item.nombre === destino.nombre && item.u === destino.u) {
        nuevo.voteDown();
      }

      return nuevo;
    });

    const nuevoFavorito =
      state.favorito &&
      nuevosItems.find(
        (item) => item.nombre === state.favorito!.nombre && item.u === state.favorito!.u,
      );

    return {
      ...state,
      items: nuevosItems,
      favorito: nuevoFavorito ?? state.favorito,
    };
  }),

  on(resetVotes, (state) => {
    const nuevosItems = state.items.map((item) => {
      const nuevo = clonarDestino(item, item.isSelected());
      nuevo.resetVotes();
      return nuevo;
    });

    const nuevoFavorito =
      state.favorito &&
      nuevosItems.find(
        (item) => item.nombre === state.favorito!.nombre && item.u === state.favorito!.u,
      );

    return {
      ...state,
      items: nuevosItems,
      favorito: nuevoFavorito ?? state.favorito,
    };
  }),

  on(trackTagClick, (state, { tag }) => ({
    ...state,
    tracking: {
      ...state.tracking,
      [tag]: (state.tracking?.[tag] ?? 0) + 1,
    },
  })),

  on(initFromDexie, (state, { destinos }) => {
    const items = destinos.map((destino) => {
      const nuevo = new DestinoViajeModel(destino.nombre, destino.u);

      nuevo.votes = destino.votes ?? 0;

      if (destino.isSelected()) {
        nuevo.setSelected(true);
      }

      return nuevo;
    });

    const favorito = items.find((item) => item.isSelected()) ?? null;

    return {
      ...state,
      items,
      favorito,
    };
  }),
);