import * as Process from "process";
import * as Assertion from "assert";
import * as Driver from "selenium-webdriver";

import { Driver as Firefox } from "selenium-webdriver/firefox.js";
import { Driver as Chrome } from "selenium-webdriver/chrome.js";
import { Driver as Safari } from "selenium-webdriver/safari.js";
import { Driver as Edge } from "selenium-webdriver/edge.js";

/// --> Common-JS := const webdriver = require("selenium-webdriver");
/// --> Common-JS := const chrome = require("selenium-webdriver/chrome");
/// --> Common-JS := const firefox = require("selenium-webdriver/firefox");

/* Linux Kernel Signals: https://man7.org/linux/man-pages/man7/signal.7.html */

const SIGNALS = {
    "OK": 0,            // Standard Success Integer -- Stops the Process
    "SIGSTOP": 19,      // Stop the Process -- Error has Occurred
    "ETIMEOUT": 128,    // Not an Official Signal (INT 127 + n --> 255)

}

const Interface = await new Driver.Builder().forBrowser("chrome").build();

const Query = Driver.By;                // --> Alias to require("selenium-webdriver").Driver.By
const Key = Driver.Key;                 // --> Alias to require("selenium-webdriver").Driver.Key
const Awaitable = Driver.until;         // --> Alias to require("selenium-webdriver").Driver.until

await Interface.get("http://www.google.com/ncr");
await Interface.findElement(Query.name("q")).sendKeys("Selenium Documentation", Key.RETURN);

try {
    const Result = await Interface.wait(Awaitable.titleIs("Selenium Documentation - Google Search"), 1000);

    Assertion.notEqual(Result, "not-equal");

    await Interface.quit();

    Process.exit(SIGNALS.OK);
} catch (error) {
    const _ = JSON.stringify(error, null, 4);
    const Type = JSON.parse(_);

    Process.stdout.write("[Warning]" + ":" + " " + "An Error has Occurred. Exiting." + "\n");
    Process.stderr.write("[Error]" + ":" + " " + _ + "\n");
    Process.stderr.write(Type);

    if (Type.name === "TimeoutError") {
        Process.exit(SIGNALS.ETIMEOUT);
    } else {
        Process.exit(SIGNALS.SIGSTOP)
    }
} finally {
    await Interface.quit();
}
