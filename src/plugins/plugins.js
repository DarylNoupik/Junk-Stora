const fs = require("fs");
const path='./src/config/plugins.json'
const plugins = JSON.parse(fs.readFileSync(path)).plugins;

//Plugin loader class
class Plugins {
  constructor(app) {
    //super();
    this.app = app;
    this.plugins = {};
  }
  async loadFromConfig(/*path='./src/config/plugins.json'*/) {
    const plugins = JSON.parse(fs.readFileSync(path)).plugins;
    for (let plugin in plugins) {
      if (plugins[plugin].enabled) {
        this.load(plugin);
      }
    }
  }

  async load(plugin) {
    const path = plugins[plugin].path;
    try {
      const module = require(path);
      this.plugins[plugin] = module;
      await this.plugins[plugin].load(this.app);
      console.log(`Loaded plugin: '${plugins[plugin].name}'`);
    } catch (e) {
      console.log(`Failed to load '${plugins[plugin].name}'`)
      this.app.stop();
    }
  }

  unload(plugin) {
    if (this.plugins[plugin]) {
      this.plugins[plugin].unload();
      delete this.plugins[plugin];
      console.log(`Unloaded plugin: '${plugins[plugin].name}'`);
    }
  }

  stop() {
    for (let plugin in this.plugins) {
      this.unload(plugin);
    }
  }
}

module.exports = Plugins;