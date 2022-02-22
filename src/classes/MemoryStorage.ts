import Room from "./Room";

export default class MemoryStorage {
  private static instance: MemoryStorage | null;
  rooms: Room[];

  private constructor() {
    this.rooms = [];
  }

  static getOrBuild(): MemoryStorage {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new MemoryStorage();

    return this.instance;
  }

  storeRoom(room: Room): number {
    if (this.doesRoomAlreadyExist(room.code)) {
      throw new Error("Room URL already exists");
    }

    this.rooms.push(room);

    return this.findRoomIndex(room);
  }

  cleanRooms(): void {
    this.rooms = [];
  }

  findRoomByCode(code: string): Room | null {
    const room = this.rooms.find((room) => room.code === code);

    if (room) {
      return room;
    }

    return null;
  }

  private doesRoomAlreadyExist(code: string): boolean {
    const room = this.rooms.find((room) => room.code === code);

    return room !== undefined;
  }

  private findRoomIndex(room: Room): number {
    const roomIndex = <number>(
      this.rooms.findIndex((persistedRoom) => persistedRoom.code === room.code)
    );

    return roomIndex;
  }
}
