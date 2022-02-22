import * as express from "express";
import MemoryStorage from "./classes/MemoryStorage";
import Player from "./classes/Player";
import Room from "./classes/Room";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/room", (req, res) => {
  const playerRoomCreator = new Player({ username: req.body.username });
  const room = Room.build({
    firstPlayer: playerRoomCreator,
  });

  const roomIndex = MemoryStorage.getOrBuild().storeRoom(room);

  return res.send({ room });
});

app.post("/room/:roomCode/join", (req, res) => {
  const roomCode = req.params.roomCode;
  const room = MemoryStorage.getOrBuild().findRoomByCode(roomCode);

  if (!room) {
    return res.status(401).send({ message: "Room does not exist" });
  }

  const secondPlayer = new Player({ username: req.body.username });

  room.secondPlayer = secondPlayer;

  return res.send({ message: "Player joined the room successfuly" });
});

app.post("/room/:roomCode/movement", (req, res) => {
  const roomCode = req.params.roomCode;
  const room = MemoryStorage.getOrBuild().findRoomByCode(roomCode);

  if (!room) {
    return res.status(401).send({ message: "Room does not exist" });
  }

  const { username, position } = req.body;

  const player =
    room.firstPlayer.username === username
      ? room.firstPlayer
      : room.secondPlayer;

  if (!player) {
    return res
      .status(401)
      .send({ message: "User does not belong to this room" });
  }

  const isPositionAvailableInTheRoom = !room.movements.includes(position);

  if (!isPositionAvailableInTheRoom) {
    return res
      .status(401)
      .send({ message: `Position #${position} already taken` });
  }

  player.addMovement(position);
  room.movements.push(position);
  return res.send({ message: "Movement saved" });
});

app.get("/room/:roomCode/winner", (req, res) => {
  const roomCode = req.params.roomCode;
  const room = MemoryStorage.getOrBuild().findRoomByCode(roomCode);

  if (!room) {
    return res.status(401).send({ message: "Room does not exist" });
  }

  const winner = room.getWinner();

  if (!winner) {
    return res.send({ message: "No winner yet!" });
  }

  room.winner = winner;
  return res.send({ message: `Winner: ${winner.username}` });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
