import CreatePlayerMovement from "./CreatePlayerMovement";
import CreateRoom from "../CreateRoom/CreateRoom";
import JoinRoom from "../JoinRoom/JoinRoom";
import GameRoomInMemory from "../../externals/repositories/GameRoomInMemory";

let gameRoomCode: string = "";
const player1 = "master123";
const player2 = "newbiew456";

describe("CreatePlayerMovement", () => {
  beforeEach(async () => {
    const createRoomPayload = {
      username: player1,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    };

    gameRoomCode = await CreateRoom(createRoomPayload);

    const secondPlayerJoinPayload = {
      username: player2,
      gameRoomCode,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    };

    await JoinRoom(secondPlayerJoinPayload);
  });

  afterEach(() => {
    GameRoomInMemory.reset();
  });

  it("creates a new movement from player 1", async () => {
    const isAWinner = await CreatePlayerMovement({
      gameRoomCode,
      username: player1,
      movement: 1,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    });

    expect(isAWinner).toBeFalsy();
  });

  it("creates a new movement from player 2", async () => {
    const isAWinner = await CreatePlayerMovement({
      gameRoomCode,
      username: player2,
      movement: 1,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    });

    expect(isAWinner).toBeFalsy();
  });

  it("creates a winner movement on player 1", async () => {
    const firstMovement = await CreatePlayerMovement({
      gameRoomCode,
      username: player1,
      movement: 1,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    });

    const secondMovement = await CreatePlayerMovement({
      gameRoomCode,
      username: player1,
      movement: 2,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    });

    const thirdMovement = await CreatePlayerMovement({
      gameRoomCode,
      username: player1,
      movement: 3,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    });

    expect(firstMovement).toBeFalsy();
    expect(secondMovement).toBeFalsy();
    expect(thirdMovement).toBeTruthy();
  });

  it("creates a winner movement on player 2", async () => {
    const firstMovement = await CreatePlayerMovement({
      gameRoomCode,
      username: player2,
      movement: 1,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    });

    const secondMovement = await CreatePlayerMovement({
      gameRoomCode,
      username: player2,
      movement: 2,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    });

    const thirdMovement = await CreatePlayerMovement({
      gameRoomCode,
      username: player2,
      movement: 3,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    });

    expect(firstMovement).toBeFalsy();
    expect(secondMovement).toBeFalsy();
    expect(thirdMovement).toBeTruthy();
  });

  it("throws a new error when try to create a new movement in a room with a winner already", async () => {
    const firstMovement = await CreatePlayerMovement({
      gameRoomCode,
      username: player2,
      movement: 1,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    });

    const secondMovement = await CreatePlayerMovement({
      gameRoomCode,
      username: player2,
      movement: 2,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    });

    const thirdMovement = await CreatePlayerMovement({
      gameRoomCode,
      username: player2,
      movement: 3,
      gameRoomRepository: GameRoomInMemory.getOrBuild(),
    });

    try {
      const fourthMovement = await CreatePlayerMovement({
        gameRoomCode,
        username: player1,
        movement: 4,
        gameRoomRepository: GameRoomInMemory.getOrBuild(),
      });
    } catch (error: any) {
      expect(error.message).toEqual(
        "It's not possible to create a new movement in a room with a winner"
      );
    }
  });
});
