# JSON-SERVER

## Create a `db.json` file

```json
{
  "hosts": [
    ...
  ]
}
```

## Create a `package.json` file

```json
{}
```

## Install JSON-Server

```bash
$ npm install json-server
```

## Update `package.json` file

```json
{
  "dependencies": {
    "json-server": "^1.0.0-beta.1"
  },
  "scripts": {
    "start": "json-server db.json"
  }
}
```

## Start JSON-Server

```bash
$ npm start
```

## Hosts endpoints

- GET /hosts
- GET /hosts/1
- POST /hosts
- PUT /hosts/1
- DELETE /hosts/1

## Client HTTP

### curl

```bash
$ curl http://localhost:3000/hosts

$ curl http://localhost:3000/hosts/1

$ curl http://localhost:3000/hosts -X POST \
-H "Content-Type: application/json" \
-d '{"address": "192.168.0.6","mask": "255.255.255.0","version": "v4"}'

$ curl http://localhost:3000/hosts/ddcb -X PUT \
-H "Content-Type: application/json" \
-d '{"address": "192.168.0.10","mask": "255.255.255.0","version": "v4"}'

$ curl http://localhost:3000/hosts/ddcb -X DELETE
```
