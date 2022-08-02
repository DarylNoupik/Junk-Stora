const express = require('express');
const Plugins = require('./src/plugins/plugins');
const EventEmitter = require('events');
require('dotenv').config();

class App extends EventEmitter{
  constructor() {
    super();

    this.plugins = new Plugins(this);

    this.server = express();
    this.server.use(express.json());
  }

  async start() {
    await this.plugins.loadFromConfig();

    this.server.get('/', (req, res) => {
      //res.send('Hello World!');
    });

    this.server.listen(process.env.APP_PORT, () => {
      console.log('Server started on port ' + process.env.APP_PORT)
    });
  }

  stop() {
    if (this.stopped) return;
+   this.plugins.stop();
    console.log('Server stopped');
    this.stopped = true;
    process.exit();
  }
}

const app = new App(); 
app.start();

["exit", "SIGINT", "SIGUSR1", "SIGUSR2", "SIGTERM", "uncaughtException"].forEach(event => {
  process.on(event, () => app.stop());
});