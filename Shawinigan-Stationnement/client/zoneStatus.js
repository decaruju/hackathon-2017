export function getAreaStatus(failedRatio = 0.5){

    var Zone = {};

    function getRandomBool(){
        return Math.random() >= failedRatio;
    }

    Zone.zoneA = getRandomBool();
    Zone.zoneB = getRandomBool();
    Zone.zoneC = getRandomBool();

    return Zone;
}
