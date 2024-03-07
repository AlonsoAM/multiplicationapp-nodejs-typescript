export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export class CreateTable implements CreateTableUseCase {
  /**
   * DI - Dependency Injection
   */
  constructor() {}

  execute({ base, limit = 10 }: CreateTableOptions) {
    let salida: string = "";
    for (let i = 1; i <= limit; i++) {
      salida += `${base} x ${i} = ${base * i}`;
      if (i < limit) salida += "\n";
    }
    return salida;
  }
}
