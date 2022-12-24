'use strict';
const { JSONCodec } = require("nats");

 class Client {
    _sc = new JSONCodec();
    _autoFlush = true;
  constructor( manager) {
    this._manager = manager
  }


  async publish(namespace, message) {
      await this._connect();
    this._manager.server.publish(namespace, this._sc.encode(message));
    if (this._autoFlush) await this._manager.server.flush();
  }

     /**
      *
      * @param {Function} fn
      * @returns {Promise<*>}
      */
  async all(fn){
      this._autoFlush = false;
      let result = null;
      if(typeof fn !== "function") {
          result = fn.call(this)
      }
      this._autoFlush = true;
      await this._manager.server.flush()
      return result;
  }

  async flush() {
    if (!this._manager.isConnected) return;
    await this._manager.server.flush();
  }
  async _connect(){
      if (this._manager.isWaiting){
          await this._manager.wait;
      }
      if (!this._manager.isConnected){
          await this._manager.connect(false);
      }
  }
  async subscribe(namespace, fn,fnError) {
      await this._connect();
    if (typeof fn !== "function") {
      throw new Error('"fn" must be a function');
    }
    const sub = this._manager.server.subscribe(namespace);
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (async (sub) => {
        for await (const message of sub) {
            try {
                 const promise = fn.call(this,new Message(message, this._sc, sub));
                 if(promise instanceof Promise) await promise;
            } catch (error) {
                if(fnError && typeof fnError === "function") fnError(error);
                console.error("NatsProvider:client:Error", error);
            }
        }
    })(sub).catch(fnError && typeof fnError === "function" ? fnError : console.error);
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
