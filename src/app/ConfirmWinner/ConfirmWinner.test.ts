import ConfirmWinner from "./ConfirmWinner";
import Player from "../../entities/Player";

describe("ConfirmWinner", () => {
  it("does not create a winner movement", () => {
    const player = new Player({ username: "master123" });

    player.movements = [1, 2, 4];

    const didPlayerWin = ConfirmWinner(player);

    expect(didPlayerWin).toBeFalsy();
  });

  describe("horizontally", () => {
    it("wins by movements [1, 2, 3]", () => {
      const player = new Player({ username: "master123" });

      player.movements = [1, 2, 3];

      const didPlayerWin = ConfirmWinner(player);

      expect(didPlayerWin).toBeTruthy();
    });

    it("wins by movements [4, 5, 6]", () => {
      const player = new Player({ username: "master123" });

      player.movements = [4, 5, 6];

      const didPlayerWin = ConfirmWinner(player);

      expect(didPlayerWin).toBeTruthy();
    });

    it("wins by movements [7, 8, 9]", () => {
      const player = new Player({ username: "master123" });

      player.movements = [7, 8, 9];

      const didPlayerWin = ConfirmWinner(player);

      expect(didPlayerWin).toBeTruthy();
    });
  });

  describe("vertically", () => {
    it("wins by movements [1, 4, 7]", () => {
      const player = new Player({ username: "master123" });

      player.movements = [1, 4, 7];

      const didPlayerWin = ConfirmWinner(player);

      expect(didPlayerWin).toBeTruthy();
    });

    it("wins by movements [2, 5, 8]", () => {
      const player = new Player({ username: "master123" });

      player.movements = [2, 5, 8];

      const didPlayerWin = ConfirmWinner(player);

      expect(didPlayerWin).toBeTruthy();
    });

    it("wins by movements [3, 6, 9]", () => {
      const player = new Player({ username: "master123" });

      player.movements = [3, 6, 9];

      const didPlayerWin = ConfirmWinner(player);

      expect(didPlayerWin).toBeTruthy();
    });
  });

  describe("diagonally", () => {
    it("wins by movements [1, 5, 9]", () => {
      const player = new Player({ username: "master123" });

      player.movements = [1, 5, 9];

      const didPlayerWin = ConfirmWinner(player);

      expect(didPlayerWin).toBeTruthy();
    });

    it("wins by movements [3, 5, 7]", () => {
      const player = new Player({ username: "master123" });

      player.movements = [3, 5, 7];

      const didPlayerWin = ConfirmWinner(player);

      expect(didPlayerWin).toBeTruthy();
    });
  });
});
