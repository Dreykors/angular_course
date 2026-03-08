import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { addDestino, elegirFavorito } from './destinos-viajes.actions';

@Injectable()
export class DestinosViajesEffects {
  private actions$ = inject(Actions);

  nuevoDestinoElegido$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addDestino),
      map(({ destino }) => elegirFavorito({ destino })),
    ),
  );
}
