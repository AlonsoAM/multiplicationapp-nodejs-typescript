import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Base of the multiplication table",
  })
  .option("l", {
    alias: "limit",
    type: "number",
    default: 10,
    describe: "Limit of the multiplication table",
  })
  .option("s", {
    alias: "show",
    type: "boolean",
    default: false,
    describe: "Show the multiplication table",
  })
  .option("n", {
    alias: "name",
    type: "string",
    default: "multiplication-table",
    describe: "Name of the file",
  })
  .option("d", {
    alias: "destination",
    type: "string",
    default: "outputs",
    describe: "Destination of the file",
  })
  .check((argv, options) => {
    if (isNaN(argv.b)) {
      throw "The base must be a number";
    }
    if (argv.b < 1) {
      throw "The base must be a positive number";
    }
    if (isNaN(argv.l)) {
      throw "The limit must be a number";
    }
    return true;
  })
  .parseSync();
