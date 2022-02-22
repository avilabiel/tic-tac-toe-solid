import Movement from "./Movement";

export default class Player {
  username: string;
  movements: Movement[];

  constructor({ username }: { username: string }) {
    this.username = username;
    this.movements = [];
  }
}
