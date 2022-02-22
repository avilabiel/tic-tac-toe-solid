import * as crypto from "crypto";
import Player from "./Player";
import Movement from "./Movement";

export default class Room {
  code: string;
  firstPlayer: Player;
  movements: Movement[];
  secondPlayer?: Player;
  winner?: Player;

  constructor({ code, firstPlayer }: { code: string; firstPlayer: Player }) {
    this.code = code;
    this.firstPlayer = firstPlayer;
    this.movements = [];
    this.winner = null;
    this.secondPlayer = null;
  }

  static build({ firstPlayer }: { firstPlayer: Player }): Room {
    const code = this.buildRoomCode();
    return new Room({ firstPlayer, code });
  }

  private static buildRoomCode(): string {
    return crypto.randomBytes(6).toString("hex");
  }

  getWinner(): Player | null {
    const doesRoomHaveLessThanTwoPlayers =
      !this.firstPlayer || !this.secondPlayer;

    if (doesRoomHaveLessThanTwoPlayers) {
      return null;
    }

    const isFirstPlayerWinner = this.isPlayerWinner(this.firstPlayer);

    if (isFirstPlayerWinner) {
      return this.firstPlayer;
    }

    const isSecondPlayerWinner = this.isPlayerWinner(this.secondPlayer);

    if (isSecondPlayerWinner) {
      return this.secondPlayer;
    }

    return null;
  }

  private isPlayerWinner(player: Player): boolean {
    const didPlayerWinVertical =
      [1, 4, 7].every((movement) => player.movements.includes(movement)) ||
      [2, 5, 8].every((movement) => player.movements.includes(movement)) ||
      [3, 6, 9].every((movement) => player.movements.includes(movement));

    const didPlayerWinHorizontal =
      [1, 2, 3].every((movement) => player.movements.includes(movement)) ||
      [4, 5, 6].every((movement) => player.movements.includes(movement)) ||
      [7, 8, 9].every((movement) => player.movements.includes(movement));

    const didPlayerWinDiagonal =
      [1, 5, 9].every((movement) => player.movements.includes(movement)) ||
      [3, 5, 7].every((movement) => player.movements.includes(movement));

    const didPlayerWin =
      didPlayerWinVertical || didPlayerWinHorizontal || didPlayerWinDiagonal;

    return didPlayerWin;
  }
}
