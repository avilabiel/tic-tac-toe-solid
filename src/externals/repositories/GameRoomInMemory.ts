import GameRoom, { IGameRoom } from "../../entities/GameRoom";

export default class GameRoomInMemory implements IGameRoom {
  static instance: GameRoomInMemory | null = null;
  public gameRooms = [];

  private constructor() {}

  static getOrBuild(): GameRoomInMemory {
    if (!this.instance) {
      this.instance = new GameRoomInMemory();
      return this.instance;
    }

    return this.instance;
  }

  static reset(): void {
    this.instance = null;
  }

  async create(gameRoom: GameRoom): Promise<void> {
    this.gameRooms.push(gameRoom);
  }

  async getByCode(gameRoomCode: string): Promise<GameRoom> {
    return this.gameRooms.find((gameRoom) => gameRoom.code === gameRoomCode);
  }

  async getIndexByCode(gameRoomCode: string): Promise<number> {
    return this.gameRooms.findIndex(
      (gameRoom) => gameRoom.code === gameRoomCode
    );
  }

  async update(gameRoom: GameRoom): Promise<void> {
    const persistedRoomIndex = await this.getIndexByCode(gameRoom.code);

    this.gameRooms[persistedRoomIndex] = gameRoom;
  }

  async deleteAll(): Promise<void> {
    this.gameRooms = [];
  }
}
