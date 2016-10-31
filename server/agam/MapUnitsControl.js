// Using for the units and patients schema
var Units = require('../../server/common/models/unitSchema');
//require('../../models/unitSchema');
var Patient = require('../../server/common/models/patientSchema');

var GetUnitsOnMap = function(hirarchCode, callback) 
{
    Units.aggregate([
        //A query for all the stations under the users permission.
        {"$match": {"$and":[{"id" : {"$regex": "^" + hirarchCode}},
                           {"$or":[{"name":{$regex: "Taagad"}},
                           {"name":{$regex: "Palhak"}}]}]}},
        {"$project": {"title": 4, "id":"$id", "name":"$name", "lat":"$location.lat", "lng":"$location.lng"}}],
     
        function(err,res)
        {
            var jsonUnits = res;
          // Go over all the stations
          res.forEach(function(element) 
            {
                console.log(element.name);

            //Get the amount of non ergent patients in the station    
            GetEmergency(element.id,1, function(data){
                element.NotUrgent =data[0].count;
            });
 
            //Get the amount of ergent patients in the station
             GetEmergency(element.id,2, function(data){
                element.Urgent =data[0].count;
            });
                      
            },this);
            // return all the units that should be displayed on the map
            callback(res);
        });
}

console.log("Test");

module.exports = 
{
    GetUnitsOnMap : GetUnitsOnMap
};

var GetEmergency = function(StationID,emergencyNum, callback)
{
    Patient.aggregate([
                {"$match":{"CurrentStation":StationID}},
                //{"$match":{"generalData.emergency":emergencyNum}},
                {"$group":{"_id":1, "count": {"$sum":1} }}
                ],
                function(err,res)
                {
                    console.log(JSON.stringify(res));
                    callback(res);    
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