export function getAreaStatus(failedRatio = 0.5){

    var Zone = {};

    function getRandomBool(){
        return Math.random() >= failedRatio;
    }

    Zone.zoneB = getRandomBool();
    Zone.zoneA = getRandomBool();
    Zone.zoneC = getRandomBool();

    return Zone;
}
