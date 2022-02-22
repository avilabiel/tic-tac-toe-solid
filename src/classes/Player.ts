import Movement from "./Movement";

export default class Player {
  username: string;
  movements: number[];

  constructor({ username }: { username: string }) {
    this.username = username;
    this.movements = [];
  }

  addMovement(position: Movement): void {
    this.movements.push(position);
  }
}
