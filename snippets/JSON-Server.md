# `@cloud-technology/server` #

*A Mock Back-End Server*

## Notice ##

**Please Note**: Everything *programmatically* in the [`@cloud-technology/server`](https://github.com/cloud-hybrid/cloud-technology/tree/Development/server)
package/directory is *used only for local development*; the state of the package is subject to change at anytime,
so zero expectations should be had when using.

However, documentation is always updated and should be used for reference.

Removing `git` tracking from commonly found `json-mock` server file(s) & directories such as

- `db.json`
- `routes.json`
- `public`

*is currently under consideration*. At the moment, these files *are* being untracked.

## Usage ##

### Setup ###

1. Install
    ```bash
    npm install --global json-server
    ```

2. Establish a Database Schema
    - `db.json`:
    ```json
    {
        "posts": [
            { "id": 1, "title": "json-server", "author": "typicode" }
        ],
        "comments": [
            { "id": 1, "body": "some comment", "postId": 1 }
        ],
        "profile": { "name": "typicode" }
    }
    ```

3. Start the Server
    ```bash
    json-server --watch db.json
    ```

### Schema Loading ###

`json-server` can remotely ***load-in*** a JSON schema:

```bash
json-server https://organization.io/private/api/endpoint
```

### Adding Custom Routes ###

`db.json`

```json
{
    "posts": [
        { "id": 1, "title": "json-server", "author": "typicode" }
    ],
    "comments": [
        { "id": 1, "body": "some comment", "postId": 1 }
    ],
    "profile": { "name": "typicode" }
}
```
`routes.json`

```json
{
    "/api/*": "/$1",
    "/:resource/:id/show": "/:resource/:id",
    "/posts/:category": "/posts?category=:category",
    "/articles\\?id=:id": "/posts/:id"
}
```

#### Command ####

```bash
json-server db.json --routes routes.json
```
