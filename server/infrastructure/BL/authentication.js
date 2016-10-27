var User = require("/server/infrastructure/Model/User");
var Promise = require("es6-promise").Promise;


function login(username, password)
{
    var promise = new Promise(function(resolve, reject)
    {
        User.findOne({username : username, password : password}, function(err, user)
        {
            if (err)
            {
                reject(err);
            }
            else 
            {
                resolve(user);
            }
        });
    });

    return promise;
}

module.exports = {
    login : login
};