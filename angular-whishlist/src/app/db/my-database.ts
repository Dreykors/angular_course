import Dexie, { Table } from 'dexie';

export interface DestinoViajeRecord {
  id?: number;
  nombre: string;
  u: string;
  servicios: string[];
  votes: number;
  selected: boolean;
}

export class MyDatabase extends Dexie {
  destinos!: Table<DestinoViajeRecord, number>;

  constructor() {
    super('MyDatabase');

    this.version(1).stores({
      destinos: '++id,nombre,u',
    });
  }
}

export const db = new MyDatabase();
