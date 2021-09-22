#!/usr/bin/env node

/*****
 *  Semantic Versioning - and `package.json` Archiving Utility
 * =====================
 *
 * The following Utility will archive `package.json` file(s), bump a VERSION lock file(s), propagate
 * the changed version to the target `package.json` file(s), create or overwrite a `Version.js` file
 * inside of `[src]` || `[source]` w/updated version(s), and most importantly, if found inside a
 * nested Node JS project or inside of a git submodule, *recursively* perform all operations throughout
 * each package.
 *
 * Setup & Usage
 *    - Instantiate a `VERSION` File
 *    >>> ./Version.js
 *
 *    - Increment the Major `VERSION` & `package.json` Version(s)
 *    >>> ./Version.js --Increment --Major --Write
 *
 *    - Increment the Minor `VERSION` & `package.json` Version(s)
 *    >>> ./Version.js --Increment --Minor --Write
 *
 *    - Increment the Patch `VERSION` & `package.json` Version(s)
 *    >>> ./Version.js --Increment --Patch --Write
 *
 * Packaged Commands
 * -----------------
 * >>> "scripts": {
 * >>>    "patch": "node Version.js --Increment --Write --Patch",
 * >>>    "minor": "node Version.js --Increment --Write --Minor",
 * >>>    "major": "node Version.js --Increment --Write --Major"
 * >>> }
 *
 * @returns Signal(0)
 */

const Version = {};
const Datetime = new Date();

// --> Standard-Library
const Runtime = require("process");
const Path = require("path");
const FS = require("fs");

const CLI = Runtime.argv;
const Parameters = CLI.splice(2);

const Entry = Runtime.env.npm_package_json;

const Throw = {
    Trigger: false
};

(Entry !== undefined && FS.existsSync(Entry) && (
        FS.statSync(Entry).isFile() || FS.statSync(Path.join(Entry, "package.json")).isFile())
) ? console.info("[DEBUG]",
    "➜" + " " + "Package" + ":", Entry
): Throw.Trigger = true;

if (Throw.Trigger === true) {
    console.error("[ERROR]",
        "➜" + " " + "Message" + ":", "Version.js must be interfaced via NPM",
        "\n", "             >>> \"scripts\": {",
        "\n", " ---------   ...     \"patch\": \"node Version.js --Increment --Write --Patch\"",
        "\n", "  Example    ...     \"minor\": \"node Version.js --Increment --Write --Minor\"",
        "\n", " ---------   ...     \"major\": \"node Version.js --Increment --Write --Major\"",
        "\n", "             ... }"
    );
    Runtime.exit(128);
}

const UID = require("crypto").randomBytes(256 / 8).toString("hex");

const Random = () => require("crypto").randomBytes(256 / 8).toString("hex");

const Directory = __dirname;
const Handler = FS.readFileSync(Entry);

const CWD = Runtime.cwd();

console.info("[DEBUG]",
    "➜" + " " + "CWD" + ":", CWD
);

// Runtime.chdir(CWD);

console.info(
    "[DEBUG]",
    "➜" + " " + "Working Directory" + ":" + " " + Runtime.cwd()
);

const Data = JSON.parse(Handler);

const Today = Datetime.toISOString(Datetime.getTime()).slice(0, 10);

console.info(
    "[DEBUG]",
    "➜" + " " + "Date" + ":" + " " + Today
);

const Archive = Path.join(Directory, ".version");
const Folder = Path.join(Archive, Today);
const File = Path.join(Directory, "VERSION");

const Exportables = [];
const Source = () => {
    let target;

    target = Path.dirname(Entry) + Path.sep + "Source";
    (FS.existsSync(target) && FS.lstatSync(target).isDirectory()) ?
        Exportables.push([target, Path.normalize(target)]): null;

    target = Path.dirname(Entry) + Path.sep + "src";
    (FS.existsSync(target) && FS.lstatSync(target).isDirectory()) ?
        Exportables.push([target, Path.normalize(target)]): null;

};
Source();

const Tree = {
    Root: null,
    Modules: []
}

/**
 * Finds the pathname of the parent module's package descriptor file. If the
 * directory is undefined (the default case), then it is set to the directory
 * name of the parent module's filename. If no package.json file is found, then
 * the parent directories are recursively searched until the file is found or
 * the root directory is reached. Returns the pathname if found or null if not.
 */
function Package(directory) {
    if ( ! directory) directory = Path.dirname(__dirname + Path.sep + "CLI");

    var file = Path.resolve(directory, "package.json");
    var module = Path.resolve(directory, "Module.js");

    const Modular = FS.existsSync(module) && FS.statSync(module).isFile();

    if (FS.existsSync(file) && FS.statSync(file).isFile() || Modular) {
        Tree.Modules.push(directory);
        const Target = (Modular) ? Path.join(Path.dirname(module), "..")
            : Path.join(Path.dirname(file), "..");
        return Package(Target);
    }

    var parent = Path.resolve(directory, "..");

    if (parent === directory) return CWD;
    return Package(parent);
}

Tree.Root = Package();

console.info(
    "[DEBUG]",
    "➜" + " " + "Package" + ":" + " " + Tree.Root
);

console.info(
    "[DEBUG]",
    "➜" + " " + "Modules" + ":" + " " + JSON.stringify(Tree.Modules, null, 4)
);

const Generation = {};

Tree.Modules.forEach((Element, Index) => {
    const Directory = String(Element);
    const Keys = Directory.split(Path.sep);
    const Length = Keys.length;

    const Key = Keys[Length - 1];

    const Version = Path.join(Directory, "VERSION");
    const Archive = Path.join(Directory, ".version");
    const Target = Path.join(Archive, Today);

    Generation[Key] = {};

    if ( ! (FS.existsSync(Path.join(Directory, "package.json"))) ) {
        const Components = Directory.split(Path.sep);
        const Length = Components.length;
        const Package = Components[Length - 1];

        FS.writeFileSync(
            Path.join(Directory, "package.json"),
            JSON.stringify(
                {
                    "name": Package,
                    "version": "0.0.0",
                    "private": true,
                    "author": "Jacob B. Sanders",
                    "license": "BSD-3-Clause",
                    "description": "Module Path",
                    "scripts": {},
                    "dependencies": {},
                    "devDependencies": {},
                    "workspaces": [
                        "./*"
                    ]
                }, null, 4
            )
        );
    }

    const Buffer = FS.readFileSync(
        Path.join(Directory, "package.json")
    );

    Generation[Key].Data = JSON.parse(Buffer);

    // Generation[Key].Version = ...
    if ( ! FS.existsSync(Path.normalize(Version))) {
        FS.writeFileSync(
            Path.join(Version),
            "0.0.0"
        );
    }

    // Generation[Key].Archive = ...
    if ( ! FS.existsSync(Path.normalize(Target))) FS.mkdirSync(Archive);

    // Generation[Key].Date = ...
    if ( ! FS.existsSync(Path.normalize(Target))) {
        FS.mkdirSync(Target);
    }

    const File = Path.join(Target, Random());
    FS.writeFileSync(
        File + "." + "JSON",
        JSON.stringify(
            Generation[Key].Data, null, 4
        )
    );

    FS.writeFileSync(
        Path.join(Version),
        Generation[Key].Data.version
    );

    Generation[Key].FS = {
        Archive: Path.normalize(Archive),
        Output: Path.normalize(Target),
        File: File
    };
})

if (Parameters.includes("--Increment") || Parameters.includes("--increment")) {
    Version.Current = {};
    Version.Target = {};

    const Current = Data.version.split(".");

    Version.Current.Major = Current[0];
    Version.Current.Minor = Current[1];
    Version.Current.Patch = Current[2];

    const Major = () => {
        Version.Target.Major = String(
            Number(Version.Current.Major) + 1
        );
        Version.Target.Minor = String(Version.Current.Minor);
        Version.Target.Patch = String(Version.Current.Patch);
    };

    const Minor = () => {
        Version.Target.Major = String(Version.Current.Major);
        Version.Target.Minor = String(
            Number(Version.Current.Minor) + 1
        );
        Version.Target.Patch = String(Version.Current.Patch);
    };

    const Patch = () => {
        Version.Target.Major = String(Version.Current.Major);
        Version.Target.Minor = String(Version.Current.Minor);
        Version.Target.Patch = String(
            Number(Version.Current.Patch) + 1
        );
    };

    (Parameters.includes("--Major") || Parameters.includes("--major"))
        ? Major(): console.info("[DEBUG]"
            + " ➜ Skipping Major Incrementor");
    (Parameters.includes("--Minor") || Parameters.includes("--minor"))
        ? Minor(): console.info("[DEBUG]"
            + " ➜ Skipping Minor Incrementor");
    (Parameters.includes("--Patch") || Parameters.includes("--patch"))
        ? Patch(): console.info("[DEBUG]"
            + " ➜ Skipping Patch Incrementor");

    console.info(
        "[DEBUG] ➜ Version "
        + String(Version.Current.Major)
        + "."
        + String(Version.Current.Minor)
        + "."
        + String(Version.Current.Patch)
        + " >>> "
        + String(Version.Target.Major)
        + "."
        + String(Version.Target.Minor)
        + "."
        + String(Version.Target.Patch)
    );
}

Parameters.forEach((Value, Index) => {
    switch (Value) {
        case "--Write": {
            const ID = UID.toUpperCase();
            const Target = Folder + Path.sep
                + ID + ".JSON";
            const Export = Folder

            FS.writeFileSync(Target, JSON.stringify(Data, null, 4));

            console.info("[DEBUG] ➜ Successfully Created & Wrote to Archive");

            Data.version = String(
                String(Version.Target.Major)
                + "."
                + String(Version.Target.Minor)
                + "."
                + String(Version.Target.Patch)
            );

            FS.writeFileSync(Entry, JSON.stringify(Data, null, 4));

            console.info("[DEBUG] ➜ Successfully Wrote to Package Index");

            FS.writeFileSync(File, Data.version);

            console.info("[DEBUG] ➜ Successfully Incremented VERSION Lock");

            Exportables.forEach(
                (Exportable, Index, _) => {
                    console.info("[DEBUG] ➜ Writing Version.js" + ":" + " " + Exportable[1]);
                    FS.writeFileSync(Path.join(Exportable[1], "Version.js"), "const Version = " + "\""
                        + String(Data.version) + "\"" + ";\n" + "\n"
                        + "exports.default = Version;" + "\n"
                    );
                }
            )

            console.info("[DEBUG] ➜ Successfully Wrote Version.js File(s)");

            Runtime.exit(0);
        }
            break;

        case "--Archive":
            Parameters.includes("--Archive") ?
                FS.writeFileSync(
                    Folder + Path.sep + UID.toUpperCase() + ".JSON",
                    JSON.stringify(Data, null, 4)
                ): console.info();
            break;

        default:
            break;

    }
});

module.exports.default = {
    Tree: Tree,
    Parent: Tree.Root,
    Modules: Tree.Modules,
    Parameters: Parameters,
    Version: Generation
};

console.info(
    "[DEBUG]",
    "➜" + " " + "Exports" + ":" + " " + JSON.stringify(
        module.exports.default, null, 4
    )
);
