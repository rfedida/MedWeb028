var crypto = require("crypto");
var ncp = require("copy-paste");
var readline= require("readline");

var rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});

var lines  = process.stdout.getWindowSize()[1];
for (var i = 0; i< lines; i++)
{
    console.log("\r\n");
}

rl.question("insert your password ==>", (password) => {
    var hash = crypto.createHash("sha256").update(password).digest("base64");;

    ncp.copy(hash, function(){
        console.log("-------------------------------------------------");
        console.log("---------------COPIED TO CLIPBOARD---------------");
        console.log("-------------------------------------------------");
        console.log();
        console.log(hash);
        console.log("Press ctrl + d to EXIT");
    });
})