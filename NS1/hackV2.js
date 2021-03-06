var logging = true;
var target = args[0];
var serverName = getHostname();
var serverRam = getServerRam(serverName);
var serverRamTotal = serverRam[0];
var serverRamFree = serverRamTotal - serverRam[1] - 10; // 10GB RAM Buffer (Just in case)
var moneyMax = getServerMaxMoney(target);
var moneyThreshold = 0.10;
var securityMin = getServerMinSecurityLevel(target);
var hackSec = 0.002;
var growSec = 0.002;
var weakenSec = 0.05;
var hackReq = 0;
var growReq = 0;
var weakenReq = 0;

if (!fileExists("lite_hack.script")) { scp("lite_hack.script", "home", serverName) }
if (!fileExists("lite_grow.script")) { scp("lite_grow.script", "home", serverName) }
if (!fileExists("lite_weaken.script")) { scp("lite_weaken.script", "home", serverName) }
var hackRam = getScriptRam("lite_hack.script");
var growRam = getScriptRam("lite_grow.script");
var weakenRam = getScriptRam("lite_weaken.script");
//Check Server Statistics
//Prepare Server for hack
//Weaken to Min security
//Grow till Max money
//Calculate Optimal Hack/Grow/Weaken threads
//ThreadCount for 75% of servers moneyMax
//ThreadCount to grow to max from remaining 25% moneyMax
//ThreadCount for security weaken to reduce back to min with above thead counts
//Calculate Stagger times for parralel operations
//Run Hack/Grow/Weaken in parallel
//Repeat. Hack/Grow Weaken if in optimal state.

function log(msg) {
    if (logging) {
        print(msg);
    }
}

function runGrow(threads, time) {
    log("runGrow: th=" + threads + " t=" + time);
    run("lite_grow.script", Math.ceil(threads + 1), target);
    if (time > 0) { sleep(getGrowTime(target) * 1000) }
    sleep(1000);
}

function runHack(threads, time) {
    log("runHack: th=" + threads + " t=" + time);
    run("lite_hack.script", Math.ceil(threads + 1), target);
    if (time > 0) { sleep(getHackTime(target) * 1000) }
    sleep(1000);
}

function runWeaken(threads, time) {
    log("runWeaken: th=" + threads + " t=" + time);
    run("lite_weaken.script", Math.ceil(threads + 1), target);
    if (time > 0) { sleep(getWeakenTime(target) * 1000) }
    sleep(1000);
}

function calcGrowthReq() {
    return growthAnalyze(target, moneyMax / getServerMoneyAvailable(target));
}

function prepareTarget() {
    log("Preparing Target");
    //Determin Sec Lvl including sec change due to growth
    //Then determin number of required weaken operations
    while (getServerMoneyAvailable(target) < moneyMax) {
        var reqGrow = calcGrowthReq();
        var reqWeaken = (getServerSecurityLevel(target) - securityMin + reqGrow * growSec) / weakenSec;
        if (reqGrow > serverRamFree / growRam) {
            reqGrow = serverRamFree / growRam;
        }
        runGrow(reqGrow, true);
        runWeaken(reqWeaken, true);
    }
}

//TODO: SUPPPPPEERRR DIRTTYYYYYY MUST REFACTOR AND CLEAN!
function calculateThreads() {
    log("calculating optimal Threads");
    var optimized = false;
    while (!optimized) {
        var reqHack = hackAnalyzeThreads(target, moneyMax * moneyThreshold); //Needs to be at Max Funds
        var growMulti = 1 + (moneyThreshold / (1 - moneyThreshold))
        var reqGrow = growthAnalyze(target, growMulti);
        var reqWeaken = reqGrow * growSec + reqHack * hackSec;
        var reqRam = reqHack * hackRam + reqGrow * growRam + reqWeaken * weakenRam

        print(vsprintf("Steal: %s, Hack: %s, Grow: %s, Weaken: %s, Total Ram: %s",[moneyThreshold, reqHack, reqGrow, reqWeaken, reqRam]))

        if (reqRam >= serverRamFree * 0.9 && reqRam <= serverRamFree * 0.99) {
            hackReq = Math.floor(reqHack);
            growReq = Math.ceil(reqGrow);
            weakenReq = Math.ceil(reqWeaken);
            optimized = true;
        } else if(reqRam > serverRamFree * 0.99) {
            moneyThreshold -= 0.01;
        }else {
            moneyThreshold += 0.05;
        }
    }
}

function mainRun() {

    while (true) {

        //Seconds -> Milliseconds
        var hackTime = getHackTime(target) * 1000;
        var weakenTime = getWeakenTime(target) * 1000;
        var growTime = getGrowTime(target) * 1000;

        var maxTime = weakenTime;
        if (hackTime > maxTime) { maxTime = hackTime }
        if (growTime > maxTime) { maxTime = growTime }

        var deltaHack = maxTime - hackTime;
        var deltaGrow = maxTime - growTime + 500;
        var deltaWeaken = maxTime - weakenTime + 1000;

        run("lite_hack.script", hackReq, target, deltaHack);
        run("lite_grow.script", growReq, target, deltaGrow);
        run("lite_weaken.script", weakenReq, target, deltaWeaken);

        sleep(maxTime + 2000)
    }
}

prepareTarget();
calculateThreads();
mainRun();

//TODO: See if removing Time Calculations from loop is good idea
