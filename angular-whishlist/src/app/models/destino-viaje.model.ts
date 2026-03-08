export class DestinoViajeModel {
  private selected!: boolean;
  public servicios: string[];
  public votes: number;

  constructor(
    public nombre: string,
    public u: string,
    votes: number = 0,
  ) {
    this.servicios = ['piscina', 'desayuno'];
    this.votes = votes;
    this.selected = false;
  }

  isSelected(): boolean {
    return this.selected;
  }

  setSelected(s: boolean) {
    this.selected = s;
  }

  voteUp(): void {
    this.votes++;
  }

  voteDown(): void {
    this.votes--;
  }

  resetVotes(): void {
    this.votes = 0;
  }
}
