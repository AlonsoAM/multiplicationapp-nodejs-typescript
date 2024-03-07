// import { yarg } from './args.plugin';

const runCommand = async (args: string[]) => {
  process.argv = [...process.argv, ...args];
  const { yarg } = await import("./args.plugin");
  return yarg;
};

describe("ArgsPlugin", () => {
  const originalArgv = process.argv;

  beforeEach(() => {
    process.argv = originalArgv;
    jest.resetModules();
  });

  it("should return default values", async () => {
    // Arrange
    const argv = await runCommand(["-b", "5"]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 10,
        s: false,
        n: "multiplication-table",
        d: "outputs",
      })
    );
  });

  it("should return configuration with custom values", async () => {
    // Arrange
    const argv = await runCommand([
      "-b",
      "5",
      "-l",
      "20",
      "-s",
      "-n",
      "custom",
    ]);

    expect(argv).toEqual(
      expect.objectContaining({
        b: 5,
        l: 20,
        s: true,
        n: "custom",
        d: "outputs",
      })
    );
  });
});
