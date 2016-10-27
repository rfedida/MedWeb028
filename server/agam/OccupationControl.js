var Patient = require('../../models/patientSchema.js');

 var  getOcupationAmoutGraph = function(hirarchCode){

     Patient.find(function(err, res){
         console.log(res);
     });
    // checking the location in the hirarchy
    switch (hirarchCode.length) {
        case 1: // pikud
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
            break;
        }
        case 3: // ugda
        {
            // Get all the taagads in the hirarchy
            Patient.aggregate(
                [{"$match": {"CurrentStation" : {"$regex": "/^" + hirarchCode + ".{4}$/"}}},
                {"$group" : {
                    "_id" : {"Station": "$CurrentStation",
                        "Emergency": "$General_Data.Emergency"},
                    "count": {"$sum": 1}
                    }},
                {"$group":{
                    "_id" : "$_id.Emergency",
                    "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
                }
                ], function(res, err){
                    console.log(res);
                }
            );

            // Get all the palhaks in the hirarchy
            Patient.aggregate(
                [{"$match": {"CurrentStation" : {"$regex": "/^" + hirarchCode + ".{2}$/"}}},
                {"$group" : {
                    "_id" : {"Station": "$CurrentStation",
                        "Emergency": "$General_Data.Emergency"},
                    "count": {"$sum": 1}
                    }},
                {"$group":{
                    "_id" : "$_id.Emergency",
                    "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
                }
                ]
            ).exec(function (err, res)
            { 
                console.log(res)
            });         
        }
        case 5: // palhak
        {
            // Get all the taagads in the hirarchy
            Patient.aggregate(
                [{"$match": {"CurrentStation" : {"$regex": "/^" + hirarchCode + ".{4}$/"}}},
                {"$group" : {
                    "_id" : {"Station": "$CurrentStation",
                        "Emergency": "$General_Data.Emergency"},
                    "count": {"$sum": 1}
                    }},
                {"$group":{
                    "_id" : "$_id.Emergency",
                    "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
                }
                ], function(res, err){
                    
                }
            );

            // Get the current palhak 
            Patient.aggregate([
            {"$match": {"CurrentStation" :hirarchCode}},
            {"$group" : {
                  "_id" : {"Station": "$CurrentStation",
                         "Emergency": "$General_Data.Emergency"},
                  "count": {"$sum": 1}
             }},
            {"$group":{
                   "_id" : "$_id.Emergency",
                   "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
            }], function(res, err) {

            });

            break;
        }
        case 7: // taagad
        {
            Patient.aggregate([
            {"$match": {"CurrentStation" :hirarchCode}},
            {"$group" : {
                  "_id" : {"Station": "$CurrentStation",
                         "Emergency": "$General_Data.Emergency"},
                  "count": {"$sum": 1}
             }},
            {"$group":{
                   "_id" : "$_id.Emergency",
                   "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
            }], function(res, err) {

            });

            break;
        }
        default:
            break;
    }
}

module.exports = 
{
    getOcupationAmoutGraph : getOcupationAmoutGraph
};