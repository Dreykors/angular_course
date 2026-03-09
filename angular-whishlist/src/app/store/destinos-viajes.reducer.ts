import { createReducer, on } from '@ngrx/store';
import { DestinoViajeModel } from '../models/destino-viaje.model';
import { initialDestinosViajesState } from './destinos-viajes.state';
import {
  addDestino,
  elegirFavorito,
  initMyData,
  removeDestino,
  resetVotes,
  voteDownDestino,
  voteUpDestino,
} from './destinos-viajes.actions';

function clonarDestino(destino: DestinoViajeModel, selected = false): DestinoViajeModel {
  const nuevo = new DestinoViajeModel(destino.nombre, destino.u, destino.votes);
  nuevo.setSelected(selected);
  return nuevo;
}

function esMismoDestino(a: DestinoViajeModel, b: DestinoViajeModel): boolean {
  return a.nombre === b.nombre && a.u === b.u;
}

function removerPrimeraCoincidencia(
  items: DestinoViajeModel[],
  destino: DestinoViajeModel,
): DestinoViajeModel[] {
  let eliminado = false;

  return items.filter((item) => {
    if (!eliminado && esMismoDestino(item, destino)) {
      eliminado = true;
      return false;
    }
    return true;
  });
}

export const destinosReducer = createReducer(
  initialDestinosViajesState,

  on(initMyData, (state, { destinos }) => ({
    ...state,
    items: destinos.map(
      (nombre) => new DestinoViajeModel(nombre, 'https://picsum.photos/seed/nature/600/350'),
    ),
    favorito: null,
  })),

  on(addDestino, (state, { destino }) => ({
    ...state,
    items: [...state.items, clonarDestino(destino)],
  })),

  on(removeDestino, (state, { destino }) => {
    const nuevosItems = removerPrimeraCoincidencia(state.items, destino).map((item) =>
      clonarDestino(item, item.isSelected()),
    );

    const favoritoSigueExistiendo =
      state.favorito != null && nuevosItems.some((item) => esMismoDestino(item, state.favorito!));

    return {
      ...state,
      items: nuevosItems,
      favorito: favoritoSigueExistiendo ? state.favorito : null,
    };
  }),

  on(elegirFavorito, (state, { destino }) => {
    const nuevosItems = state.items.map((item) =>
      clonarDestino(item, esMismoDestino(item, destino)),
    );

    const nuevoFavorito = nuevosItems.find((item) => esMismoDestino(item, destino)) ?? null;

    return {
      ...state,
      items: nuevosItems,
      favorito: nuevoFavorito,
    };
  }),

  on(voteUpDestino, (state, { destino }) => {
    const nuevosItems = state.items.map((item) => {
      const nuevo = clonarDestino(item, item.isSelected());
      if (esMismoDestino(item, destino)) {
        nuevo.voteUp();
      }
      return nuevo;
    });

    const nuevoFavorito =
      state.favorito == null
        ? null
        : (nuevosItems.find((item) => esMismoDestino(item, state.favorito!)) ?? null);

    return {
      ...state,
      items: nuevosItems,
      favorito: nuevoFavorito,
    };
  }),

  on(voteDownDestino, (state, { destino }) => {
    const nuevosItems = state.items.map((item) => {
      const nuevo = clonarDestino(item, item.isSelected());
      if (esMismoDestino(item, destino)) {
        nuevo.voteDown();
      }
      return nuevo;
    });

    const nuevoFavorito =
      state.favorito == null
        ? null
        : (nuevosItems.find((item) => esMismoDestino(item, state.favorito!)) ?? null);

    return {
      ...state,
      items: nuevosItems,
      favorito: nuevoFavorito,
    };
  }),

  on(resetVotes, (state) => {
    const nuevosItems = state.items.map((item) => {
      const nuevo = clonarDestino(item, item.isSelected());
      nuevo.resetVotes();
      return nuevo;
    });

    const nuevoFavorito =
      state.favorito == null
        ? null
        : (nuevosItems.find((item) => esMismoDestino(item, state.favorito!)) ?? null);

    return {
      ...state,
      items: nuevosItems,
      favorito: nuevoFavorito,
    };
  }),
);
