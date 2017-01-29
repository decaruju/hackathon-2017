export function getAreaStatus(failedRatio = 0.5){

    var Zone = {};

    function getRandomBool(){
        return Math.random() >= failedRatio;
    }

    Zone.zoneB = false;
    Zone.zoneA = true;
    Zone.zoneC = getRandomBool();

    return Zone;
}
