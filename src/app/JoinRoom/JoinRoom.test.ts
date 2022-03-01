import JoinRoom from "./JoinRoom";
import CreateRoom from "../CreateRoom/CreateRoom";
import GameRoomInMemory from "../../externals/repositories/GameRoomInMemory";

let gameRoomCode: string = "";

describe("JoinRoom", () => {
  beforeEach(async () => {
    const payload = {
      username: "master123",
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    };

    gameRoomCode = await CreateRoom(payload);
  });

  afterEach(() => {
    GameRoomInMemory.reset();
  });

  it("joins the room", async () => {
    const secondPlayerJoin = {
      username: "newbie456",
      gameRoomCode,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    };

    await JoinRoom(secondPlayerJoin);

    expect(true).toBeTruthy();
  });

  it("throws an error when room already has two players", async () => {
    const secondPlayer = "newbie456";
    const thirdPlayer = "jedi789";

    const secondPlayerJoin = {
      username: secondPlayer,
      gameRoomCode,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    };

    await JoinRoom(secondPlayerJoin);

    const thirdPlayerJoin = {
      username: thirdPlayer,
      gameRoomCode,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    };

    try {
      await JoinRoom(thirdPlayerJoin);
    } catch (error) {
      expect(error.message).toEqual("Room already has two players joined");
    }
  });
});
