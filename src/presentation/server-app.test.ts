import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";
describe("Server App", () => {
  const options = {
    base: 2,
    limit: 10,
    showTable: false,
    fileName: "table",
    destination: "test-destination",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should created serverApp instance", async () => {
    const serverApp = new ServerApp();
    expect(serverApp).toBeInstanceOf(ServerApp);
    expect(typeof ServerApp.run).toBe("function");
  });

  it("should run serverApp", async () => {
    // const run = jest.spyOn(ServerApp, "run");
    // const createTableSpy = jest.spyOn(CreateTable.prototype, "execute");
    // const saveFileSpy = jest.spyOn(SaveFile.prototype, "execute");
    // const logSpy = jest.spyOn(console, "log");
    // ServerApp.run(options);
    // expect(run).toHaveBeenCalledWith({
    //   base: 2,
    //   limit: 10,
    //   showTable: false,
    //   fileName: "table",
    //   destination: "test-destination",
    // });
    // expect(logSpy).toHaveBeenCalledTimes(2);
    // expect(logSpy).toHaveBeenNthCalledWith(1, "Server running...");
    // expect(logSpy).toHaveBeenNthCalledWith(2, "File created!");
    // expect(createTableSpy).toHaveBeenCalledTimes(1);
    // expect(createTableSpy).toHaveBeenCalledWith({
    //   base: options.base,
    //   limit: options.limit,
    // });
    // expect(saveFileSpy).toHaveBeenCalledTimes(1);
    // expect(saveFileSpy).toHaveBeenCalledWith({
    //   fileContent: expect.any(String),
    //   destination: options.destination,
    //   fileName: options.fileName,
    // });
  });

  it("should run with custom values mockes", () => {
    const logMock = jest.fn();
    const createMock = jest.fn().mockReturnValue("table");
    const saveMock = jest.fn().mockReturnValue(true);

    global.console.log = logMock;
    CreateTable.prototype.execute = createMock;
    SaveFile.prototype.execute = saveMock;

    ServerApp.run(options);

    expect(logMock).toHaveBeenCalledWith("Server running...");
    expect(createMock).toHaveBeenCalledWith({
      base: options.base,
      limit: options.limit,
    });
    expect(saveMock).toHaveBeenCalledWith({
      fileContent: expect.any(String),
      destination: options.destination,
      fileName: options.fileName,
    });
    expect(logMock).toHaveBeenCalledWith("File created!");
  });
});
