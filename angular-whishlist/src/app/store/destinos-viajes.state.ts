import { DestinoViajeModel } from '../models/destino-viaje.model';

export interface DestinosViajesState {
  items: DestinoViajeModel[];
  favorito: DestinoViajeModel | null;
  loading: boolean;
}

export interface AppState {
  destinos: DestinosViajesState;
}

export const initialDestinosViajesState: DestinosViajesState = {
  items: [],
  favorito: null,
  loading: false,
};
