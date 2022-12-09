'use strict';
const  { connect } =  require("nats");
const Client = require("./Client");
class Manager {
  _promiseManager;
  _manager;
  _waiting = false;
  _isConnected = false;
  _error = false;
  get wait() {
    return this._promiseManager;
  }
  get server() {
    return this._manager;
  }
  constructor(options) {
    this._options = options;
    //this.connect(false);
  }
  connect(throwError = false){
    this._waiting = true;
    return this._promiseManager = connect(this._options)
        .then((res) => {
          this._manager = res;
          this._error = false;
          this._isConnected = true;
          console.log('[NATS] connect success ');
        })
        .catch((error) => {
          this._error = true;

          if(throwError){
            throw error;
          }else{
            console.log('[NATS] fail connect', error);
          }
        })
        .finally(() => (this._waiting = false));
  }
  get isConnected() {
    return this._isConnected;
  }
  get isWaiting(){
    return this._waiting;
  }
  getClient() {
    return new Client(this);
  }
}

module.exports = Manager;
