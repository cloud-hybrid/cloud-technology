# Cloud Technology #

Cloud Technology LLC's `Node.js` Packaged Systems & Utilities

## Ideas ##

- [ ] File-System "Database" system for CMS or Form CMS using Python's Pickled
Data Type(s) + S3 Remote Storage
-

## Setup & Initialization ##

```bash
git clone "https://github.com/cloud-hybrid/cloud-technology.git" ./cloud-technology

cd "${_}" && git submodule init

# --> Merge Strategy
git config --file ".gitconfig" pull.rebase false

git submodule update --recursive
git submodule foreach git checkout "$(git rev-parse --abbrev-ref HEAD)"
git submodule foreach git pull origin "$(git rev-parse --abbrev-ref HEAD)"
```

## Workspaces ##

### Creating a Workspace ###

In order to add or create a workspace, either instantiate the folder +
NPM-compliant package structure, or run the following command:

```bash
npm init --yes --workspace "[Workspace-Name]"
```

The workspace name can also be a relative path:

```bash
npm init --yes --workspace "./packages/[Workspace-Name]"
```

As well as a wildcard:

```bash
npm init --yes --workspace "./packages/[Workspace-Name]/*"
```

### Managing Specific Workspace(s) ###

**Adding a Dependency Package**:

```bash
npm install "[Dependency]" --workspace "[Workspace-Name]" ? --save-dev
```

**Building a specific Workspace**:

```bash
npm ci --workspace "[Workspace-Name]"
```

### Running Localized Workspace Commands ###

**Example (React Application):**

```bash
npm run start --workspace packages/ui-template
npm run build --workspace packages/ui-template
```

#### Overview ####

Every package has the capability to run `scripts`, and given the specifities of
how [Node.js handles module resolution](https://nodejs.org/dist/latest-v14.x/docs/api/modules.html#modules_all_together),
it's possible to consume any defined workspace by it's declared `package.json` name.

Similar to an import, such defined `scripts` can be ran from the root package as
if the current-working-directory were already localized to the target module.

```javascript
// ./packages/ui-menu/index.js
module.exports = () => (<DOM/>);

/// --- ///

// ./packages/ui-shell/index.js
const Menu = require("@cloud-technology/ui-menu");

...

const DOM = () => {
    return (
        <>
            <Menu/>
            <Shell/>
        </>
    );
};

module.exports = () => (<DOM/>);
```

Lastly,

```bash
npm run start --workspace "./packages/ui-shell"
```

## NPM ##

- [**Usage & Reference**](./documentation/NPM-Usage.md#npm)
    - [*Package Registries*](./documentation/NPM-Usage.md#Registries)
        - [Public Registry Setup](./documentation/NPM-Usage.md#public-setup)
        - [Private Registry Setup](./documentation/NPM-Usage.md#private-setup)
    - [*CI Usage & Deployable(s)*](./documentation/NPM-Usage.md#ci)
        - [Shrinkwrap](./documentation/NPM-Usage.md#shrinkwrap)
    - [*Organizational Scope(s)*](./documentation/NPM-Usage.md#scopes)
        - [Overview](./documentation/NPM-Usage.md#overview)
        - [Installing Scopes](./documentation/NPM-Usage.md#installing-scoped-packages)
        - [Using Scoped Packages](./documentation/NPM-Usage.md#requiring-scoped-packages)
