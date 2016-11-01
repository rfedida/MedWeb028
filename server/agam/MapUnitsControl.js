// Using for the units and patients schema
var Units = require('../../server/common/models/unitSchema');
//require('../../models/unitSchema');
var Patient = require('../../server/common/models/patientSchema');
var jsonUnits =[];

var GetUnitsOnMap = function (hirarchCode, callback) 
{
    Units.aggregate([
        //A query for all the stations under the users permission.
        {"$match": {"$and":[{"id" : {"$regex": "^" + hirarchCode}},
                           {"$or":[{"name":{$regex: "Taagad"}},
                           {"name":{$regex: "Palhak"}}]}]}},
        {"$project": {"title": 4, "id":"$id", "name":"$name", "lat":"$location.lat", "lng":"$location.lng"}}],
     
        function(err,res)
        {
          callback(res);
        });
}

console.log("Test");

module.exports = 
{
    GetUnitsOnMap : GetUnitsOnMap,
    GetEmergency : GetEmergency
};

var GetEmergency = function(StationID,emergencyNum, callback)
{
    var count = 0;

    Patient.aggregate([
                {"$match":{"CurrentStation":StationID}},
                {"$match":{"generalData.emergency":emergencyNum}},
                {"$group":{"_id":1, "count": {"$sum":1} }}
                ],
                function(err,res)
                {
                    if (res !=null && res.length > 0)
                    {
                        console.log(JSON.stringify(res));
                        count = res[0].count;
                         
                    }
                   callback(count);
                }
   );
}

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