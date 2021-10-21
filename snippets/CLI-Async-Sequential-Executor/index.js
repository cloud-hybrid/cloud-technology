import { exec as Command } from "child_process";

const Output = (_) => process.stdout.write(_ + "\n");

/***
 *
 * @param command
 *
 * @returns {Promise<String>}
 *
 * @constructor
 *
 */

const Execute = async (command) => new Promise((resolve, reject) => Command(command, (exception, output, error) => {
    (exception) ? reject(new Error("[Error]" + " " + String(exception))) : null;
    (error)     ? reject(new Error("[Error]" + " " + String(error))) : null;
    (output)    ? resolve(output.trim()) : resolve(null);
}));

const Commands = {
    LS: async () => await Execute("ls").then(($) => Output($)),
    LS2: async () => await Execute("ls").then(($) => Output($ + "2")),
};

await Commands.LS();
await Commands.LS2();

