const IPFS  = require('ipfs-http-client');
const messages = require('../utils/messages');
const fs = require('fs');
const path = require('path');

//Backup data to secure storage
async function SaveDataInIPFS(req, res, tempPath) {
    //Get Encrypt database
    const readStream = fs.createReadStream(tempPath);

    // connect to the default API address http://localhost:5001
    const client = IPFS.create(process.env.IPFS_DAEMON_URL)

    // call Core API methods
    const result = await client.add(
        {
            path: path.basename(tempPath),
            //content: EncryptData.Encrypt(readStream.toString(), privatekey).encryptedData.toString()
            content: readStream
        }
    )
    //const result = await client.add(readStream)
    console.log(result)
    //res.send("https://ipfs.io/ipfs/" + result.path + tempPath.toString().substring(1))
    fs.unlink(tempPath, (err) => {
        if(err) {
            res.send({error : messages.error})
            return console.log(err)
        };
        res.send({success: true, CID : result.cid.toString().replace("CID(", "").replace(")", "") /*+ "/" + path.basename(tempPath)*/ })
    })
}

exports.SaveDataInIPFS = SaveDataInIPFS;
