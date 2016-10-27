var Patient = require('../common/nothing.js');

function getOcupationAmoutGraph(hirarchCode){

    // checking the location in the hirarchy
    if (hirarchCode.length == 1) // pikud
    {
        Patient.aggregate([
        {"$match": {"CurrentStation" : {"$regex": "/^" + hirarchCode + "/"}}},
        {"$project": { "title": 2, "CurrentStation": {"$substr": ["$CurrentStation", 0, 3]}, "Emergency": "$General_Data.Emergency"}},
        {"$group" : {
            "_id" : {"Emergency": "$Emergency",
            "Station": "$CurrentStation"},
            "count": {"$sum": 1}
        }},
        {
        "$group": {
            "_id": {"Emergency": "$_id.Emergency"},
            "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
        }], 
            function(res, err){

            });
    }
}
