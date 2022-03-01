import Player from "../../entities/Player";
import GameRoom, { IGameRoom } from "../../entities/GameRoom";
import { triggerAsyncId } from "async_hooks";

export default async ({
  username,
  gameRoomCode,
  gameRoomRepository,
}: {
  username: string;
  gameRoomCode: string;
  gameRoomRepository: IGameRoom;
}): Promise<void> => {
  const persistedRoom = await gameRoomRepository.getByCode(gameRoomCode);

  console.log("Persisted Room ===========", persistedRoom);

  if (persistedRoom.player1 && persistedRoom.player2) {
    throw new Error("Room already has two players joined");
  }

  const secondPlayer = new Player({ username });

  persistedRoom.player2 = secondPlayer;

  await gameRoomRepository.update(persistedRoom);
};
