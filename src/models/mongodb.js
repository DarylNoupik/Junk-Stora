const BKP = require("mongodb-snapshot");
const encryptdata = require("../utils/encryptdata");
const messages = require("../utils/messages");
// create a client to mongodb
const MongoClient = require('mongodb').MongoClient;
const fs = require("fs");


//Backup database
async function MongoSnapBackup(path, privateKey, publickey, req, res) {
    const mongo_connector = new BKP.MongoDBDuplexConnector({
        //connection: { uri: mongoCString, dbname: dbName }
        connection: { uri: process.env.MONGO_STRING_CONNECTION, dbname: process.env.MONGO_DBNAME }
    });
    const localfile_connector = new BKP.LocalFileSystemDuplexConnector({
        connection: { path: path }
    });
    const transferer = new BKP.MongoTransferer({ source: mongo_connector, targets: [localfile_connector] },) ;
    for await (const { total, write } of transferer) { 
        //console.log(`remaining bytes to write: ${total - write}`);
    }

    await encryptdata.EncryptFile(path, privateKey.toString(), publickey.toString(), req, res)
}

//Restore database
async function MongoSnapRestore(path, req, res) {
    var Restore = async() => {
        const mongo_connector = new BKP.MongoDBDuplexConnector({
            //connection: { uri: mongoCString, dbname: dbName }
            connection: { uri: process.env.MONGO_STRING_CONNECTION, dbname: process.env.MONGO_DBNAME }
        });
        const localfile_connector = new BKP.LocalFileSystemDuplexConnector({
            connection: { path: path }
        });
        const transferer = new BKP.MongoTransferer({ source: localfile_connector, targets: [mongo_connector] },) 
        for await (const { total, write } of transferer) { 
            //console.log(`remaining bytes to write: ${total - write}`);
        }
        
        fs.unlink(path,function(err){
            if(err) return console.log(err);
            console.log('temp deleted successfully');
            res.send({success: true, message:"Restore success"})
         }); 
    }

    // make client connect to mongo service
    MongoClient.connect(process.env.MONGO_STRING_CONNECTION).then((client) => {
  
        // Reference of database
        const connect = client.db(process.env.MONGO_DBNAME);
      
        // Dropping the database
        connect.dropDatabase();

        Restore()
      
        console.log("Dropping successful");
    }).catch((err) => {
        console.log(err.Message);
    })
}

exports.MongoSnapRestore = MongoSnapRestore;
exports.MongoSnapBackup = MongoSnapBackup;