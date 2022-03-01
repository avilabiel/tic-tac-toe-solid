import GameRoomInMemory from "./GameRoomInMemory";
import GetRoomInMemory from "./GameRoomInMemory";

describe("GameRoomInMemory", () => {
  afterEach(() => {
    GetRoomInMemory.reset();
  });

  it("builds a new instance", () => {
    const repository = GetRoomInMemory.getOrBuild();

    expect(repository).toBeInstanceOf(GameRoomInMemory);
  });

  it("returns a built instance", () => {
    const repository = GetRoomInMemory.getOrBuild();

    const secondRepository = GetRoomInMemory.getOrBuild();

    expect(repository).toBe(secondRepository);
  });
});
