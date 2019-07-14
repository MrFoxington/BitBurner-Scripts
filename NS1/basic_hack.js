var target = args[0];
var maxThreads = args[1];
var moneyThreshold = getServerMaxMoney(target) * 0.85;
var securityThreshold = getServerMinSecurityLevel(target) + 5;

while (true) {
    //Grow if money < 75% max money
    //Weaken if security > min sec + 5
    //Hack otherwise

    if (getServerSecurityLevel(target) >= securityThreshold) {
        weaken(target);
    } else if (getServerMoneyAvailable(target) < moneyThreshold) {
        grow(target);
    } else {
        threads = hackAnalyzeThreads(target, moneyThreshold / 2);
        if (threads > maxThreads) { threads = maxThreads; }
        hack(target, { threads: threads });
    }
}
