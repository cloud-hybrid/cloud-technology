#!/usr/bin/env node

"use strict";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (error) => {
  console.error(error);
});

var chalk = require("chalk");

var currentNodeVersion = process.versions.node;
var semver = currentNodeVersion.split(".");
var major = semver[0];

if (major < 12) {
  console.error(
    chalk.red(
      `You are running Node ${currentNodeVersion}.\n` +
        `@cloud-technology/cli requires Node 14 or higher, please update your ` +
        `version of Node.`
    )
  );
  process.exit(1);
}

const Source = require("./Source/Main");

console.debug(Source);

Source.Handler(process).catch((error) => {
  console.error(error);
  process.exit(1);
});
