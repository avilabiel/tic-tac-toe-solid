import CreateRoom from "./CreateRoom";
import GameRoomInMemory from "../../externals/repositories/GameRoomInMemory";

describe("CreateRoom", () => {
  afterEach(() => {
    GameRoomInMemory.reset();
  });

  it("builds a new room", async () => {
    const payload = {
      username: "master123",
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    };

    const roomCode = await CreateRoom(payload);

    console.log(
      "Testing Game Rooms after creation",
      GameRoomInMemory.getOrBuild().gameRooms
    );

    expect(typeof roomCode).toBe("string");
    expect(roomCode).toHaveLength(36);
  });
});
