angular.module('infra').service("currentUser", function($cookies)
{
    var userDetails = null;

    function getDetails(){
        if (userDetails == null && $cookies.get("user") != null)
        {
            userDetails = JSON.parse($cookies.get("user"));
        }

        return userDetails;
    }

    function setDetails(user)
    {
        userDetails = user;
    }

    
    function logout()
    {
        $cookies.remove("user", {path : "/"});
        $cookies.remove("hash", {path : "/"});
        window.location="/";
    };

    return({
        getDetails : getDetails,
        setDetails : setDetails,
        logout : logout
    });
});