'use strict';

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

/*
|--------------------------------------------------------------------------
| Nats
|--------------------------------------------------------------------------
|
| Sophos returns bits of inspiration for your next big startup idea.
|
*/

module.exports = {
    /*
    |--------------------------------------------------------------------------
    | Source URL
    |--------------------------------------------------------------------------
    |
    | The URL of the resource queried for data.
    |
    */
    servers: Env.get('NATS_SERVERS','localhost').split(',').map(e => e.trim()),
}
