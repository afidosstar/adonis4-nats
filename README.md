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
    '@fickou/adonis4-nats/providers/NatsProvider',
]
```

# Sample Usage
in service who you want to use
```js
try {
   const data={...};
    const Client = use("Adonis/Nats/Client");
    await Client.publish(`eventName`, data)
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
client.subscribe("eventName", function (message) {
    console.log(message);
})
```

### Message interface

````txt
Message {
    msg: Msg<any>// go to nats docs
    decodeMsgContent: Record<string, any>
    sub: Subscription//go to nats docs
}
````



[typescript-image]: https://img.shields.io/badge/Typescript-294E80.svg?style=for-the-badge&logo=typescript
[typescript-url]:  "typescript"

[npm-image]: https://img.shields.io/npm/v/%40fickou%2Fadonis-controller-helpers.svg?style=for-the-badge&logo=npm
[npm-url]: https://www.npmjs.com/package/adonis-request-throttler "npm"

[license-image]: https://img.shields.io/npm/l/%40fickou%2Fadonis-controller-helpers?color=blueviolet&style=for-the-badge
[license-url]: LICENSE.md "license"

