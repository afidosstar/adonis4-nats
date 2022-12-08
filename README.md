# Adonis-Nats
> Add helper on Controller for Adonis JS 4+

[![typescript-image]][typescript-url] 
[![npm-image]][npm-url] 
[![license-image]][license-url]

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of contents

- [Installation](#installation)
- [Sample Usage](#sample-usage)
  

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation
Run:
```bash
npm i --save @fickou/adonis4-nats
```

Install provider:

Go to `start/app.js`
```js
const providers = [
    ...,
    '@fickou/adonis4-nats/providers/NatsProvider'
]
```

# Sample Usage
in service who you want to use
```js
try {
   const data={...};
    const client = use("NatsClient");
    await client.publish(`eventName`, data)
}catch (e){}
```

## Listener 

In a preload file:

Create preload file in `start/nats.js`.

Add in `server.js`.

```js
  const {Ignitor} = require('@adonisjs/ignitor');

new Ignitor(require('@adonisjs/fold'))
    .appRoot(__dirname)
    .preLoad('start/nats') // add
    .fireHttpServer()
    .catch(console.error);
```

After got to `start/nats.js`

```js
const client = use("NatsClient");
await client.subscribe("eventName", function (message) {
    console.log(message);
})
```

## Message interface

````txt
Message {
    msg: Msg<any>// go to nats docs
    decodeMsgContent: Record<string, any>
    sub: Subscription//go to nats docs
}
````

## How to use nats ?

docker user:

create `nats-cluster.yaml`
```yml
version: "3.5"
services:
  nats:
    image: nats
    ports:
      - "8222:8222"
      - "4222:4222"
    command: "--cluster_name nats --cluster nats://0.0.0.0:6222 --http_port 8222 "
    networks: ["nats"]
    volumes:
      - natsData:/data
networks:
  nats:
    name: nats
```

run :

````bash
docker  docker compose -f nats-cluster.yaml up -d
````

[more..](https://docs.nats.io/)





[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/%40fickou%2Fadonis4-nats.svg?style=for-the-badge&logo=npm
[npm-url]: https://www.npmjs.com/package/%40fickou%2Fadonis4-nats "npm"

[license-image]: https://img.shields.io/npm/l/%40fickou%2Fadonis4-nats?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

