import { Routes } from '@angular/router';
import { ListaDestinos } from './lista-destinos/lista-destinos';
import { DestinoDetalle } from './destino-detalle/destino-detalle';
import { Login } from './login/login';
import { Protected } from './protected/protected';
import { usuarioLogueadoGuard } from './guards/usuario-logueado.guard';
import { Vuelos } from './vuelos/vuelos';
import { VuelosMain } from './vuelos/vuelos-main';
import { VuelosMasInfo } from './vuelos/vuelos-mas-info';
import { VuelosDetalle } from './vuelos/vuelos-detalle';
import { Reservas } from './reservas/reservas';
import { ReservasListado } from './reservas/reservas-listado';
import { ReservasDetalle } from './reservas/reservas-detalle';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ListaDestinos },
  { path: 'destino', component: DestinoDetalle },
  { path: 'login', component: Login },
  {
    path: 'protected',
    component: Protected,
    canActivate: [usuarioLogueadoGuard],
  },
  {
    path: 'vuelos',
    component: Vuelos,
    canActivate: [usuarioLogueadoGuard],
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: VuelosMain },
      { path: 'mas-info', component: VuelosMasInfo },
      { path: 'detalle/:id', component: VuelosDetalle },
    ],
  },
  {
    path: 'reservas',
    component: Reservas,
    children: [
      { path: '', component: ReservasListado },
      { path: ':id', component: ReservasDetalle },
    ],
  },
];
