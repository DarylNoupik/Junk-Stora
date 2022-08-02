//Check PrivateKey Format
function checkPrivateKey (privatekey){
    if((privatekey === "" || privatekey == null || privatekey.length > 64 || privatekey.length < 64 )){
        console.log(privatekey)
        console.log(privatekey.length)
        return false;
    }else{
        return true;
    }
}

//Check Publickey Format
function checkPublicKey (publickey){
    if((publickey == "" || publickey == null || publickey.length > 58 || publickey.length < 58 )){
        console.log(publickey)
        console.log(publickey.length)
        return false;
    }else{
        return true;
    }
}

//Check CID Format
function checkCID(cid){
    if((cid === "" || cid == null || cid.length < 46 )){
        return false;
    }else{
        return true;
    }
}

//Check Data Format
function checkData(data){
    if((data === "" || data == null)){
        return false;
    }else{
        return true;
    }
}

exports.checkPrivateKey = checkPrivateKey;
exports.checkPublicKey= checkPublicKey;
exports.checkCID = checkCID;
exports.checkData = checkData;