import Movement from "../../entities/Movement";
import { IGameRoom } from "../../entities/GameRoom";
import ConfirmWinner from "../ConfirmWinner";

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

  const didPlayerWin = ConfirmWinner(player);

  if (didPlayerWin) {
    persistedRoom.winner = player;
  }

  await gameRoomRepository.update(persistedRoom);
  return didPlayerWin;
};
