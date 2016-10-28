var User = require("../../common/models/usersSchema");
var Promise = require("es6-promise").Promise;
var crypto = require("crypto");

function login(username, password, request)
{
    var promise = new Promise(function(resolve, reject)
    {
        var hash = crypto.createHash("sha256").update(password).digest("base64");
        User.findOne({UserName : username, Password : hash}, function(err, user)
        {
            if (err || user == null)
            {
                reject(err);
            }
            else 
            {
                user.hash = hash;
                resolve(user);
            }
        });
    });

    return promise;
}

function getUser(request)
{
    if (request.cookies.hash == null)
    {
        return;
    }
    else if(request.sessions[request.cookies.hash] == null)
    {
        return;
    }
    else
    {
        return request.sessions[request.cookies.hash];
    }
}

module.exports = {
    login : login
};