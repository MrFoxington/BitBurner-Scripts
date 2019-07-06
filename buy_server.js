//Server Ram#
var ram = Math.pow(2,args[0]);
var servNum = 1;
// var servNum = getPurchasedServers.length + 1;
var servLimit = getPurchasedServerLimit();
var name;
var scriptRam = getScriptRam("basic_Hack.script");
var maxThreads = 0;
maxThreads = ram / scriptRam - 2;
var i = 1;
var targets = ["foodnstuff", "sigma-cosmetics", "nectar-net", "joesguns", "hong-fang-tea", "harakiri-sushi", "CSEC", "zer0", "neo-net", "iron-gym", "max-hardware", "rothman-uni", "catalyst", "rho-construction", "summit-uni", "comptek", "netlink", "millenium-fitness", "global-pharm", "lexo-corp", "alpha-ent", "snap-fitness", "unitalife", "syscore", "zb-def", "univ-energy", "nova-med"];

//var threadsAb1le = Math.floor(ram/getScriptRam());

while (servNum <= servLimit) {
    if (getServerMoneyAvailable('home') > getPurchasedServerCost(ram)) {
        if (getHackingLevel() > getServerRequiredHackingLevel(targets[i])) {
            name = 's' + servNum;
            servNum++;
            purchaseServer(name, ram);
            scp("basic_Hack.script", name);
            exec("basic_Hack.script", name, maxThreads, targets[i], maxThreads);
            i++;
        }
    }
    sleep(60000);
}
