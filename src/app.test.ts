describe("App", () => {
  it("should call Server.run with values", () => {
    const runMock = jest.fn();
    jest.mock("./presentation/server-app", () => {
      return {
        ServerApp: {
          run: runMock,
        },
      };
    });

    jest.mock("./config/plugins/args.plugin", () => {
      return {
        yarg: {
          b: 2,
          l: 10,
          s: true,
          n: "table-2",
          d: "output",
        },
      };
    });

    require("./app");

    expect(runMock).toHaveBeenCalledWith({
      base: 2,
      limit: 10,
      showTable: true,
      fileName: "table-2",
      destination: "output",
    });
  });
});
