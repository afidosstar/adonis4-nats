'use strict';
const { JSONCodec } = require("nats");

 class Client {
    _sc = new JSONCodec();
  constructor( manager) {
    this._manager = manager
  }


  async publish(namespace, message,autoFlush) {
    if (!this._manager.isConnected) return;
    this._manager.server.publish(namespace, this.sc.encode(message));
    if (autoFlush) await this._manager.server.flush();
  }
  async flush() {
    if (!this._manager.isConnected) return;
    await this._manager.server.flush();
  }
  subscribe(namespace, fn) {
    if (!this._manager.isConnected) return;
    if (typeof fn !== "function") {
      throw new Error('"fn" must be a function');
    }
    const sub = this._manager.server.subscribe(namespace);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (async (sub) => {
      for await (const message of sub) {
        try {
          return fn(new Message(message, this._sc, sub));
        } catch (error) {
          console.error("NatsProvider:client:Error", error);
        }
      }
    })(sub);
    return sub;
  }
}
class Message {
  _message;
    sub;
  constructor(message, sc,sub) {
    this._message = message;
    this._sc = sc;
    this.sub = sub
 }
 get msg() {
    return this._message;
  }
  get decodeMsgContent() {
    return this._sc.decode(this._message.data);
  }
}
module.exports = Client;
