import Movement from "../../entities/Movement";
import Player from "../../entities/Player";
import { IGameRoom } from "../../entities/GameRoom";

export default async ({
  gameRoomCode,
  username,
  movement,
  gameRoomRepository,
}: {
  gameRoomCode: string;
  username: string;
  movement: Movement;
  gameRoomRepository: IGameRoom;
}): Promise<boolean> => {
  const persistedRoom = await gameRoomRepository.getByCode(gameRoomCode);

  if (persistedRoom.winner) {
    throw new Error(
      "It's not possible to create a new movement in a room with a winner"
    );
  }

  const playerIndex =
    persistedRoom.player1.username === username ? "player1" : "player2";

  const player = persistedRoom[playerIndex];

  player.movements = [...player.movements, movement];
  persistedRoom[playerIndex] = player;

  const didPlayerWin = isPlayerWinner(player);

  if (didPlayerWin) {
    persistedRoom.winner = player;
  }

  await gameRoomRepository.update(persistedRoom);
  return didPlayerWin;
};

const isPlayerWinner = (player: Player): boolean => {
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
};
