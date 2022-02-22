import Player from "./Player";
import Room from "./Room";

describe("Room", () => {
  it("creates a new room", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const room = Room.build({ firstPlayer });

    expect(room.code).toBeDefined();
    expect(room.firstPlayer).toBeDefined();
  });

  it("wins horizontally with 1,2,3 positions", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const secondPlayer = new Player({ username: "master" });

    const room = Room.build({ firstPlayer });
    room.secondPlayer = secondPlayer;

    firstPlayer.addMovement(1);
    firstPlayer.addMovement(2);
    firstPlayer.addMovement(3);

    const winner = room.getWinner();

    expect(winner.username).toBe("newbie");
  });

  it("wins horizontally with 4,5,6 positions", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const secondPlayer = new Player({ username: "master" });

    const room = Room.build({ firstPlayer });
    room.secondPlayer = secondPlayer;

    firstPlayer.addMovement(4);
    firstPlayer.addMovement(5);
    firstPlayer.addMovement(6);

    const winner = room.getWinner();

    expect(winner.username).toBe("newbie");
  });

  it("wins horizontally with 7,8,9 positions", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const secondPlayer = new Player({ username: "master" });

    const room = Room.build({ firstPlayer });
    room.secondPlayer = secondPlayer;

    firstPlayer.addMovement(7);
    firstPlayer.addMovement(8);
    firstPlayer.addMovement(9);

    const winner = room.getWinner();

    expect(winner.username).toBe("newbie");
  });

  it("wins vertically with 1,4,7 positions", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const secondPlayer = new Player({ username: "master" });

    const room = Room.build({ firstPlayer });
    room.secondPlayer = secondPlayer;

    firstPlayer.addMovement(1);
    firstPlayer.addMovement(4);
    firstPlayer.addMovement(7);

    const winner = room.getWinner();

    expect(winner.username).toBe("newbie");
  });

  it("wins vertically with 2,5,8 positions", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const secondPlayer = new Player({ username: "master" });

    const room = Room.build({ firstPlayer });
    room.secondPlayer = secondPlayer;

    firstPlayer.addMovement(2);
    firstPlayer.addMovement(5);
    firstPlayer.addMovement(8);

    const winner = room.getWinner();

    expect(winner.username).toBe("newbie");
  });

  it("wins vertically with 3,6,9 positions", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const secondPlayer = new Player({ username: "master" });

    const room = Room.build({ firstPlayer });
    room.secondPlayer = secondPlayer;

    firstPlayer.addMovement(3);
    firstPlayer.addMovement(6);
    firstPlayer.addMovement(9);

    const winner = room.getWinner();

    expect(winner.username).toBe("newbie");
  });

  it("wins diagonally with 1,5,9 positions", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const secondPlayer = new Player({ username: "master" });

    const room = Room.build({ firstPlayer });
    room.secondPlayer = secondPlayer;

    firstPlayer.addMovement(1);
    firstPlayer.addMovement(5);
    firstPlayer.addMovement(9);

    const winner = room.getWinner();

    expect(winner.username).toBe("newbie");
  });

  it("wins diagonally with 3,5,7 positions", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const secondPlayer = new Player({ username: "master" });

    const room = Room.build({ firstPlayer });
    room.secondPlayer = secondPlayer;

    firstPlayer.addMovement(3);
    firstPlayer.addMovement(5);
    firstPlayer.addMovement(7);

    const winner = room.getWinner();

    expect(winner.username).toBe("newbie");
  });

  it("gets first player as the winner of the room", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const secondPlayer = new Player({ username: "master" });

    const room = Room.build({ firstPlayer });
    room.secondPlayer = secondPlayer;

    firstPlayer.addMovement(3);
    firstPlayer.addMovement(5);
    firstPlayer.addMovement(7);

    const winner = room.getWinner();

    expect(winner.username).toBe("newbie");
  });

  it("gets second player as the winner of the room", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const secondPlayer = new Player({ username: "master" });

    const room = Room.build({ firstPlayer });
    room.secondPlayer = secondPlayer;

    secondPlayer.addMovement(3);
    secondPlayer.addMovement(5);
    secondPlayer.addMovement(7);

    const winner = room.getWinner();

    expect(winner.username).toBe("master");
  });

  it("returns null when there is not a winner yet", () => {
    const firstPlayer = new Player({ username: "newbie" });
    const secondPlayer = new Player({ username: "master" });

    const room = Room.build({ firstPlayer });
    room.secondPlayer = secondPlayer;

    firstPlayer.addMovement(3);
    firstPlayer.addMovement(5);

    const winner = room.getWinner();

    expect(winner).toBeNull();
  });
});
