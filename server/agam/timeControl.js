var Patient = require('../../models/patientSchema');

var 
var lengthOfHirarchy = userHirarchy.length

switch (lengthOfHirarchy)
{ 
    //tagad case
    case (7 || 5):
Pratient.aggregate([
        {
            $match: { $and :[{'Stations.stationId': userHirarchy}, {'Stations.receptionTime' : {$gt : new Date(CurrentTime) }},
              {'Stations.leavingDate': { $lt : new Date(CurrentTime) } }
          ] }
        },
        {
            $group: {
                _id: null,
                count: {$sum: 1}
            }
        }
    ], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
    break;
    case 3:

    break;
    case 1:
    break;

}
