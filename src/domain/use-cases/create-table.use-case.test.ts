import { CreateTable } from "./create-table.use-case";

describe("CreateTableUseCase", () => {
  it("should create table with default values", () => {
    const createTable = new CreateTable();
    const result = createTable.execute({ base: 2 });
    const rows = result.split("\n");

    expect(result).toContain("2 x 1 = 2");
    expect(result).toContain("2 x 10 = 20");
    expect(rows.length).toBe(10);
  });

  it("should create table with custom values", () => {
    const opciones = { base: 2, limit: 5 };
    const createTable = new CreateTable();
    const result = createTable.execute(opciones);
    const rows = result.split("\n").length;

    expect(result).toContain("2 x 1 = 2");
    expect(result).toContain("2 x 5 = 10");
    expect(rows).toBe(opciones.limit);
  });
});
