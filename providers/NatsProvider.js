'use strict'

/**
 * adonis-nats
 *
 * (c) AYEDOUN Dossou Fiacre <fiacre.ayedoun@gmail.com>
 *
 */

const { ServiceProvider } = require('@adonisjs/fold')

class NatsProvider extends ServiceProvider {
    register () {
        this.app.singleton('Adonis/Addons/Nats/Manager', (app) => {
            const Config = app.use('Adonis/Src/Config')
            const Manager = require('../src/Manager')

            return new Manager(Config.get('nats',{servers:['localhost']}));
        })

        this.app.alias('Adonis/Addons/Nats/Manager', 'NatsManager')
    }
    async boot() {
        const manager = this.app.use("Adonis/Addons/Nats/Manager");
        await manager.wait;
        await this.app.bind("Adonis/Addons/Nats/Client", () => {
            return manager.getClient();
        });
        this.app.alias('Adonis/Addons/Nats/Manager', 'NatsClient')
    }
}

module.exports = NatsProvider
