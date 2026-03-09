import { Injectable } from '@angular/core';
import { LoadFromDexieService } from './db/load-from-dexie.service';

@Injectable({
  providedIn: 'root',
})
export class AppLoadService {
  constructor(private loadFromDexieService: LoadFromDexieService) {}

  async initializeDestinosViajesState(): Promise<void> {
    await this.loadFromDexieService.load();
  }
}