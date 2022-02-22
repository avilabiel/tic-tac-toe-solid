import CreateRoom from "./CreateRoom";
import GameRoomInMemory from "../../repositories/GameRoomInMemory";

describe("CreateRoom", () => {
  it("builds a new room", async () => {
    const payload = {
      username: "master123",
      roomRepository: GameRoomInMemory.getOrBuild(),
    };

    const roomCode = await CreateRoom(payload);

    expect(typeof roomCode).toBe("string");
    expect(roomCode).toHaveLength(36);
  });
});
