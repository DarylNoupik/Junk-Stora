const IPFS  = require('ipfs-http-client');
const { checkData, checkPrivateKey, checkPublicKey, checkCID } = require('../utils/checkfunctions');
const EncryptData = require("../utils/encryptdata");
const messages = require('../utils/messages');
const fs = require('fs');
const { MongoSnapBackup } = require('../models/mongodb');

//Controller to analyze the requests before saving the information on the decentralized storage
async function SaveDataInIPFS(req, res) {
    try{
        const privatekey = req.body.privatekey;
        const publickey = req.body.publickey;

        if(!checkPrivateKey(privatekey)){
            res.status(400)
            res.send({success: false, message:messages.incorrect_privatekey});
            return;
        }else if(!checkPublicKey(publickey)){
            res.status(400)
            res.send({success: false, message:messages.incorrect_publickey});
            return;
        }else{
            await MongoSnapBackup( process.env.BACKUP_DB_FOLDER +"/backupDatabase.tar", privatekey, publickey, req, res)
        }
    }catch(e){
        console.log(e)
        res.status(500);
        res.send({success: false, message:messages.error});
    }
}


//Analyzes requests and retrieves information on the decentralized storage
async function GetDataFromIPFS(req, res){
    try{
        const cid = req.body.cid;
        const privatekey = req.body.privatekey;
        const publickey = req.body.publickey;

        if(!checkCID(cid)){
            res.status(400);
            res.send({success: false, message:messages.incorrect_CID});
            return;
        }else if(!checkPrivateKey(privatekey)){
            res.status(400);
            res.send({success: false, message:messages.incorrect_privatekey});
            return;
        }else if(!checkPublicKey(publickey)){
            res.status(400);
            res.send({success: false, message:messages.incorrect_privatekey});
            return;
        }else{
            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            // current month
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            // current year
            let year = date_ob.getFullYear();
            // current hours
            let hours = date_ob.getHours();
            // current minutes
            let minutes = date_ob.getMinutes();
            // current seconds
            let seconds = date_ob.getSeconds();
            let dateDisplay = `${hours}${minutes}${seconds}_${month}${date}${year}`;
        
            const client = await IPFS.create(process.env.IPFS_DAEMON_URL)

            for await (const buf of client.cat(cid, {archive: false})) {
                // do something with bufc
                //console.log(buf)
                fs.createWriteStream(process.env.BACKUP_DB_FOLDER + "/" + dateDisplay + ".backup").write(buf)
                //buf.toString();
                await EncryptData.DecryptFile(buf, process.env.BACKUP_DB_FOLDER + "/" + dateDisplay + ".backup", privatekey.toString(), publickey.toString(), req, res)
            }
        }
    }catch(e){
        console.log(e)
        res.status(500);
        res.send({success: false, message:messages.error});
    }
}

exports.SaveDataInIPFS = SaveDataInIPFS;
exports.GetDataFromIPFS = GetDataFromIPFS;
