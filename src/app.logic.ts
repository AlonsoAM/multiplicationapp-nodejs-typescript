import fs from "fs";
import { yarg } from "./config/plugins/args.plugin";

console.clear();

const base: number = yarg.b;
const limit: number = yarg.l;
const showTable: boolean = yarg.s;

let salida: string = "";
let header: string = `
====================
   Tabla del: ${base}
====================\n
`;

for (let i = 1; i <= limit; i++) {
  salida += `${base} x ${i} = ${base * i}\n`;
}

salida = header + salida;

if (showTable) {
  console.log(salida);
} else {
  console.log(`Tabla del ${base} creada`);
}

const path: string = `outputs/`;

fs.mkdirSync(path, { recursive: true });

fs.writeFileSync(`${path}/tabla-${base}.txt`, salida);

console.log(`${path}tabla-${base}.txt creado`);
