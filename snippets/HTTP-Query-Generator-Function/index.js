import * as HTTPs from "https";

const Schema = {
    host: typeof String,
    port: typeof Number,
    path: typeof String,
    method: typeof String,
    rejectUnauthorized: typeof Boolean,
    requestCert: typeof Boolean,
    agent: typeof Boolean
};

/***
 *
 * @param host {string}
 * @param port {number}
 * @param path {string}
 * @param method {string| "GET" | "POST" | "..."}
 *
 * @returns {{rejectUnauthorized: boolean, path, agent: boolean, method, port, requestCert: boolean, host}}
 *
 * @constructor
 *
 */
const Configuration = (host, port, path, method) => {
    return {
        host: host,
        port: port,
        path: path,
        method: method,
        rejectUnauthorized: false,
        requestCert: true,
        agent: false
    };
}

/***
 *
 * @returns {Promise<string>}
 *
 * @constructor
 *
 * @param settings {{rejectUnauthorized: boolean, path, agent: boolean, method, port, requestCert: boolean, host}}
 *
 */

const Query = (settings) => new Promise((resolve, reject) => {
    const Request = HTTPs.request(settings, (response) => {
        let $;

        if (response.statusCode < 200 || response.statusCode >= 400) {
            return reject(new Error("[Error]" + " " + String(response.statusCode)));
        }

        response.on("data", (chunk) => {
            const Allocation = String(Buffer.from(chunk));
            if (Allocation !== undefined) {
                ($ === undefined) ? $ = Allocation
                    : $ += Allocation;
            }
        });

        response.on("end", () => resolve($));
    });

    Request.on("error", (_) => reject(_));

    Request.end();
});

const Settings = Configuration("localhost", 3000, "/Health", "GET");

const $ = await Query(Settings);

process.stdout.write($ + "\n");

