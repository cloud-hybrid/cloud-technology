# `@cloud-technology/server` #

*A Mock Back-End Server*

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

```json
{
    "/api/*": "/$1",
    "/:resource/:id/show": "/:resource/:id",
    "/posts/:category": "/posts?category=:category",
    "/articles\\?id=:id": "/posts/:id"
}
```

Then start the server

```bash
json-server db.json --routes routes.json
```
