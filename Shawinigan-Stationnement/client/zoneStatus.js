function getAreaStatus(failedRatio = 0.33){

    var Zone = {};

    function getRandomBool(){
        return Math.random() >= failedRatio;
    }

    Zone.zoneOrange = getRandomBool();
    Zone.zoneBleu = getRandomBool();
    Zone.zoneVert = getRandomBool();

    return Zone;
}
