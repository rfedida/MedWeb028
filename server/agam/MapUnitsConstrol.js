// Using for the units and patients schema
var Units = require('../../models/unitSchema');
var Patient = require('../../models/patientSchema');

var GetUnitsOnMap = function(hirarchCode, callback) 
{
    // A variable for the units that are needed acording to the hirarchy
    var jsonPartOne = {};
    var jsonPartTow = {};
    var jsonUnits = {};
   
    //A query for all the stations under the users permission.
    Units.aggregate([
        {"$match": {"id" : {"$regex": "^" + hirarchCode}}},
        {"$project": {"title": 4, "id":"$id", "name":"$name", "lat":"$location.lat", "lng":"$location.lng"}},
        {"$group":{"id":"$id","name":"$name","lat":"$lat", "lng":"$lng"}},
        function(err,res)
        {
            var index = 0;

            // go over all the units and enter the station json into the array
             res.forEach(function(element){
                 jsonUnits[index] = element;
                 index++;
             }, this);
        }
        ]);


      
  /*  Patient.aggregate([
         {"$match": [{"CurrentStation":{"$regex": "^" + hirarchCode}},{"generalData.emergency":0}]},
         {"$group":{
            "_id":null,
            "count": {"$sum":1 } }}
    ]);*/

    // return all the units that should be displayed on the map
    callback(jsonUnits);
}


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