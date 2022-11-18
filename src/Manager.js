'use strict';
import { connect } from "nats";
const Client = require("./Client");
class Manager {
  _promiseManager;
  _manager;
  _waiting = true;
  _error = false;
  get wait() {
    return this._promiseManager;
  }
  get server() {
    return this._manager;
  }
  constructor(options) {
    this._promiseManager = connect(options)
      .then((res) => {
        this._manager = res;
        this._error = false;
      })
      .catch(() => {
        this._error = true;
      })
      .finally(() => (this._waiting = false));
  }
  get isConnected() {
    return !this._waiting && !this._error;
  }
  getClient() {
    return new Client(this);
  }
}

module.exports = Manager;
