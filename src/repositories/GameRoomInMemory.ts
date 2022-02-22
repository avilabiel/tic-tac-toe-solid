import GameRoom, { IGameRoom } from "../entities/GameRoom";

export default class GameRoomInMemory implements IGameRoom {
  static instance: GameRoomInMemory | null = null;
  gameRooms = [];

  private constructor() {}

  static getOrBuild(): GameRoomInMemory {
    if (!this.instance) {
      return new GameRoomInMemory();
    }

    return this.instance;
  }

  async create(gameRoom: GameRoom): Promise<void> {
    this.gameRooms.push(gameRoom);
  }
}
