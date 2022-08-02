//Checking the crypto module
const crypto = require('crypto');
const algorithm = 'aes256'; //Using AES encryption
//const iv = crypto.randomBytes(16);
const fs = require('fs');
const zlib = require('zlib');
const { Readable } = require('stream');
const { SaveDataInIPFS } = require('../libs/ipfs');
const { MongoSnapRestore } = require('../models/mongodb');


//Encrypt file
async function EncryptFile(file, password, publickey, req, res) {
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
  
   let iv = new Buffer.from(publickey.substring(0, 16))
   const readStream = fs.createReadStream(file);
   const gzip = zlib.createGzip();
   const cipher = crypto.createCipheriv(algorithm, crypto.createHash('sha256').update(password).digest(), iv);
   // Create a write stream with a different file extension.
   const writeStream = fs.createWriteStream(process.env.BACKUP_DB_FOLDER +"/" + dateDisplay + ".backup");

   const run = async () => {
      readStream
      .pipe(gzip)
      .pipe(cipher)
      .pipe(writeStream)
      .on('close', function (err) {
         if(err) console.log(err)
         console.log('Done: ' + writeStream.path); 
         //SaveDataInIPFS(req, res, writeStream.path)
         fs.unlink(file,function(err){
            if(err) return console.log(err);
            console.log('file deleted successfully');
            SaveDataInIPFS(req, res, writeStream.path)
         }); 
      })
   };
   return run().then(() => {
      console.log("writeStream.toString()");return writeStream.path}
   ).catch((error) => {console.log(error); return "error"})
}

//EncryptFile("./collections.zip", "testpassword");

//Decrypt file
async function DecryptFile(file, path, password, publickey, req, res) {
   let iv = new Buffer.from(publickey.substring(0, 16))
   const readStream = Readable.from(file);
   const decipher = crypto.createDecipheriv(algorithm, crypto.createHash('sha256').update(password).digest(), iv);
   const unzip = zlib.createUnzip();
   const writeStream = fs.createWriteStream(process.env.BACKUP_DB_FOLDER + '/backupDatabase.tar');
 
   const run = async () => {
      readStream
      .pipe(decipher)
      .pipe(unzip)
      .pipe(writeStream)
      .on('close', function (err) {
         console.log('Done: ' + path);
         fs.unlink(path,function(err){
            if(err) return console.log(err);
            writeStream.end()
            console.log('temp deleted successfully');
            MongoSnapRestore(writeStream.path, req, res)
         }); 
      });
   };
   
  return await run().then(() => {return writeStream.path}
   ).catch((error) => {console.log(error); return "error"})
}
//DecryptFile("./enc.zip", "test", "testpassword", "4PGC6SU4YL4JVQIOX4CQSYFSAF5VLKUUPP4KC47ZK25I3QJDBBBB3PTV6A");

exports.EncryptFile = EncryptFile;
exports.DecryptFile = DecryptFile;