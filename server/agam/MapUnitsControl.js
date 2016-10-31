// Using for the units and patients schema
var Units = require('../../server/common/models/unitSchema');
//require('../../models/unitSchema');
var Patient = require('../../server/common/models/patientSchema');

var GetUnitsOnMap = function(hirarchCode, callback) 
{
    // A variable for the units that are needed acording to the hirarchy
    var jsonPartOne = {};
    var jsonPartTow = {};
    var jsonUnits = {};
   
    //A query for all the stations under the users permission.
    Units.aggregate([

        {"$match": {"$and":[{"id" : {"$regex": "^" + hirarchCode}},
                           {"$or":[{"name":{$regex: "Taagad"}},
                           {"name":{$regex: "Palhak"}}]}]}},
        {"$project": {"title": 4, "id":"$id", "name":"$name", "lat":"$location.lat", "lng":"$location.lng"}}],
     
        function(err,res)
        {
            // return all the units that should be displayed on the map
            callback(res);
        });

        /*  Patient.aggregate([
         {"$match": [{"CurrentStation":{"$regex": "^" + hirarchCode}},{"generalData.emergency":0}]},
         {"$group":{
            "_id":null,
            "count": {"$sum":1 } }}
    ]);*/
console.log("Passed step one");
 

}

console.log("Test");

module.exports = 
{
    GetUnitsOnMap : GetUnitsOnMap
};

/*
עבור כל תחנה נדרשים הנתונים הבאים:
ID של התחנה
שם התחנה (באנגלית)
מיקומי אורך ורוחב
כמות הפצועים הדחופים
כמות הפצועים הלא דחופים
*/

/*
match - מגדיר את תנאי הסינון בשאילתה
project - מסנן את השדות שנרצה לראות
group - מגדיר איזה פעולות לבצע כמו סכימה
*/