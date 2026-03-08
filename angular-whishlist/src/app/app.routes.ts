import { Routes } from '@angular/router';
import { ListaDestinos } from './lista-destinos/lista-destinos';
import { DestinoDetalle } from './destino-detalle/destino-detalle';
import { Login } from './login/login';
import { Protected } from './protected/protected';
import { usuarioLogueadoGuard } from './guards/usuario-logueado.guard';

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
];
