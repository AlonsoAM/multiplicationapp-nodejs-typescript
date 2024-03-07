import fs from "fs";
import { SaveFile } from "./save-file.use-case";
describe("SaveFileUseCase", () => {
  const options = {
    fileContent: "test content",
    destination: "custom-outputs",
    fileName: "custom-table",
  };
  const { fileContent, destination, fileName } = options;
  const filePath = `${destination}/${fileName}.txt`;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    //Clean Up
    const outputFolderExist = fs.existsSync("outputs");
    if (outputFolderExist)
      fs.rmSync("outputs", { recursive: true, force: true });

    const customOutputFolderExist = fs.existsSync("custom-outputs");
    if (customOutputFolderExist)
      fs.rmSync("custom-outputs", { recursive: true, force: true });
  });

  it("should save file with default values", () => {
    const saveFile = new SaveFile();
    const options = { fileContent: "test content" };
    const filePath = "outputs/table.txt";

    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  it("should save file with custom values", () => {
    // Arrange
    const saveFile = new SaveFile();
    // Act

    const result = saveFile.execute(options);
    const checkFile = fs.existsSync(filePath);
    const fileContentResult = fs.readFileSync(filePath, "utf-8");

    // Assert

    expect(result).toBe(true);
    expect(checkFile).toBe(true);
    expect(fileContentResult).toBe(fileContent);
  });

  it("should return false if directory could not be created", () => {
    // Arrange
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("Error creating directory");
    });

    // Act
    const result = saveFile.execute(options);

    // Assert
    expect(result).toBe(false);

    mkdirSpy.mockRestore();
  });

  it("should return false if file could not be written", () => {
    // Arrange
    const saveFile = new SaveFile();
    const writeFileSyncSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("Error writing file");
      });

    // Act
    const result = saveFile.execute(options);

    // Assert
    expect(result).toBe(false);

    writeFileSyncSpy.mockRestore();
  });
});
