myApp.service("unitIDService", function()
{
    this.unitDetails = {unitID: ""};

    function setUnitID(currentUnitID){
        this.unitDetails.unitID = currentUnitID;
    };
    this.setUnitID = setUnitID;
    
});
