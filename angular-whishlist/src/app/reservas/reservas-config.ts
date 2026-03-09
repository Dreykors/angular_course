import { InjectionToken } from '@angular/core';

export interface ReservasConfig {
  apiEndpoint: string;
}

export const RESERVAS_CONFIG = new InjectionToken<ReservasConfig>('reservas.config');

export const RESERVAS_CONFIG_VALUE: ReservasConfig = {
  apiEndpoint: 'mi_api_reservas.com',
};
