import * as Input from "readline";
import * as Utility from "util";

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

/***
 *
 * @param query
 *
 * @returns {Promise<unknown>}
 *
 * @constructor
 *
 */

const Username = (query) => new Promise( async (resolve, reject) => {
    let $;

    const Interface = Input.createInterface({
        input: process.openStdin(),
        output: process.stdout
    });

    const prompt = Utility.promisify(Interface.question).bind(Interface);

    try {
        $ = await prompt(query);
    } catch (_) { reject(_) }
    finally { Interface.close() }

    resolve($);
});

const Commands = {
    List: async () => await Execute("ls").then(($) => Output($)),
    Username: async () => await Username("Username: ")
};

await Commands.List();

const input = await Commands.Username();

console.log(input);

