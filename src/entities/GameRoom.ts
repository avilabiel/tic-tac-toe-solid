import Player from "./Player";

export default class GameRoom {
  code?: string;
  player1: Player;
  player2?: Player;
  winner?: Player;

  constructor(props: GameRoom) {
    Object.assign(this, props);
  }
}

export interface IGameRoom {
  create(gameRoom: GameRoom): Promise<void>;
}
