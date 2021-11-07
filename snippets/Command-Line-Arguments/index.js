/***
 * @module      command-line-arguments-snippet
 * @version     0.0.1 (Documentation)
 * @summary     .....
 *
 * @author      Jacob B. Sanders
 * @license     BSD 3-Clause License
 * @copyright   Cloud-Technology LLC. & Affiliates.
 *
 * @package     {@link https://github.com/cloud-hybrid/cloud-technology @cloud-technology}
 *
 * @example
 *      const $Module = "{ ... }";
 *
 */

import FS from "fs";
import Path from "path";
import Process from "process";

const $ = FS.readFileSync("package.json");
const Package = JSON.parse($);
const Version = Package["version"];

import { Command } from "commander/esm.mjs";

const CLI = new Command();

CLI // --> Command Line Options
    .version(Version, "-v, --version", "Package Version");

CLI.parse(process.argv);
