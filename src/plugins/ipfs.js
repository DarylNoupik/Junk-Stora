const fs = require('fs');
const ipfsController = require("../controller/ipfs")

//Plugin for IPFS functions
async function load(app) {
    //Create temp folder for backup and restore database
    try {
        var dir = process.env.BACKUP_DB_FOLDER;

        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
    } catch (e) {
      console.log('Cannot create folder backup for database');
    }
    // const ipfs = await IPFS.create()
    // const { cid } = await ipfs.add('Hello world')
    // console.info(cid)
    // // QmXXY5ZxbtuYj6DnfApLiGstzPN7fvSyigrRee3hDWPCafcd

    app.server.use((req, res, next) => {
        next();
    });

    app.server.post('/ipfs/mongodb/savedata', (req, res) => {
        ipfsController.SaveDataInIPFS(req, res)
        //res.send("hello world!");
    })

    app.server.get('/ipfs/mongodb/getdata', (req, res) => {
        ipfsController.GetDataFromIPFS(req, res)
        //res.send("hello world!");
    })
}

// Save request count for next time
function unload(app) {
}

module.exports = {
    load,
    unload
};