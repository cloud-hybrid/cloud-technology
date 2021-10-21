import * as HTTPs from "https";

/***
 *
 * @param url
 *
 * @returns {Promise<String>}
 *
 * @constructor
 *
 */

const Query = (url) => new Promise((resolve, reject) => {
    const Request = HTTPs.request(url, (response) => {
        let $;

        if (response.statusCode < 200 || response.statusCode >= 400) {
            return reject(new Error("[Error]" + " " + String(response.statusCode)));
        }

        response.on("data", (chunk) => {
            $ += Buffer.alloc((String(chunk).trim().length), chunk);
        });

        response.on("end", () => resolve($));
    });

    Request.on("error", (_) => reject(_));

    Request.end();
});

const $ = await Query("https://google.com");

process.stdout.write($ + "\n");

