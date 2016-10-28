var Patient = require('../../models/patientSchema');

 var  getOcupationAmoutGraph = function(hirarchCode, callback){
     var jsonDataOne = {};
      var jsonDataTwo = {};
     var jsonDataFull = {};
    // checking the location in the hirarchy
    switch (hirarchCode.length) {
        case 1: // pikud
        {
        Patient.aggregate([
        {"$match": {"CurrentStation" : {"$regex": "/^" + hirarchCode + "/"}}},
        {"$project": { "title": 2, "CurrentStation": {"$substr": ["$CurrentStation", 0, 3]}, "Emergency": "$generalData.emergency"}},
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
            function(err, res){

            });
            break;
        }
        case 3: // ugda
        {
            Patient.aggregate(
                [{"$match": {"CurrentStation" : {"$regex": new RegExp('/^' + hirarchCode + '.{2}$/')}}}/*,
                {"$group" : {
                    "_id" : {"Station": "$CurrentStation",
                        "Emergency": "$generalData.emergency"},
                    "count": {"$sum": 1}
                    }},
                {"$group":{
                    "_id" : "$_id.Emergency",
                    "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
                }*/
                ], function(err, res){
                    console.log(res);
                }
            );

            // Get all the taagads in the hirarchy
            Patient.aggregate(
                [{"$match": {"CurrentStation" : {"$regex": new RegExp('/^' + hirarchCode + '.{4}$/')}}},
                {"$group" : {
                    "_id" : {"Station": "$CurrentStation",
                        "Emergency": "$generalData.emergency"},
                    "count": {"$sum": 1}
                    }}/*,
                {"$group":{
                    "_id" : "$_id.Emergency",
                    "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
                }*/
                ], function(err, res){
                    console.log(res);
                }
            );

            // Get all the palhaks in the hirarchy
            Patient.aggregate([
{"$match": {"CurrentStation" : {"$regex": new RegExp('/^' + hirarchCode + '.{2}$/')}}}/*,
{$group : {
    _id : {"Station": "$CurrentStation",
           "Emergency": "$generalData.emergency"},
    count: {$sum: 1}
    }},
{$group:{
    _id : "$_id.Emergency",
    value: { $push : {x: "$_id.Station", y: "$count"}}}    
}*/
]).exec(function (err, res)
            { 
                
                console.log(res)
            });    

            break;     
        }
        case 5: // palhak
        {
            // Get all the taagads in the hirarchy
            Patient.aggregate(
                [{"$match": {"CurrentStation" : {"$regex": "^" + hirarchCode + ".{2}$"}}},
                {"$group" : {
                    "_id" : {"Station": "$CurrentStation",
                        "Emergency": "$generalData.emergency"},
                    "count": {"$sum": 1}
                    }},
                {"$group":{
                    "_id" : "$_id.Emergency",
                    "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
                }
                ], function(err, res){
                    
                }
            );

            // Get the current palhak 
            Patient.aggregate([
            {"$match": {"CurrentStation" :hirarchCode}},
            {"$group" : {
                  "_id" : {"Station": "$CurrentStation",
                         "Emergency": "$generalData.emergency"},
                  "count": {"$sum": 1}
             }},
            {"$group":{
                   "_id" : "$_id.Emergency",
                   "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
            }], function(err, res) {
                

                res.forEach(function(element) {
                   var key = element._id; 
                   jsonDataTwo[key] = {'key': element._id, values : element.values};
                   createFullJson(jsonDataOne, jsonDataTwo, jsonDataFull);
                   callback(jsonDataFull);
                }, this);
            });

            break;
        }
        case 7: // taagad
        {
            Patient.aggregate([
            {"$match": {"CurrentStation" :hirarchCode}},
            {"$group" : {
                  "_id" : {"Station": "$CurrentStation",
                         "Emergency": "$generalData.emergency"},
                  "count": {"$sum": 1}
             }},
            {"$group":{
                   "_id" : "$_id.Emergency",
                   "values": { "$push" : {"x": "$_id.Station", "y": "$count"}}}    
            }], function(err, res) {

            });

            break;
        }
        default:
            break;
    }

    
}

function createFullJson(one, two, full)
{
    if (one != {}) 
    {
        full[0] = one;
    }
    if (two != {})
    {
        full[1] = two;
    }

    return (full);
}

module.exports = 
{
    getOcupationAmoutGraph : getOcupationAmoutGraph
};