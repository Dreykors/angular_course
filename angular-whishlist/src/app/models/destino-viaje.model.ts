export class DestinoViajeModel {
  private selected!: boolean;
  public servicios: string[];

  constructor(
    public nombre: string,
    public u: string,
  ) {
    this.servicios = ['piscina', 'desayuno'];
  }

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(s: boolean) {
    this.selected = s;
  }
}
