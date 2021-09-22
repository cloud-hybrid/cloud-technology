# LLC's `Node.js` Systems & Utilities #

Cloud Technology LLC's `Node.js` Systems & Utilities

## Setup & Initialization ##

```bash
git clone "https://github.com/cloud-hybrid/cloud-technology.git" "./cloud-technology-2"

cd "${_}" && git submodule init

# --> Merge Strategy
git config --file ".gitconfig" pull.rebase false

git submodule update --recursive
git submodule foreach git checkout "$(git rev-parse --abbrev-ref HEAD)" 
git submodule foreach git pull origin "$(git rev-parse --abbrev-ref HEAD)"
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