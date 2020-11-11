const t0_hosts = ["foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", "harakiri-sushi"];
const t1_hosts = ["neo-net", "zer0", "max-hardware", "iron-gym"];
const t2_hosts = ["phantasy", "silver-helix", "omega-net", "crush-fitness", "johnson-ortho", "the-hub"];
const t3_hosts = ["comptek", "rothman-uni", "netlink", "summit-uni", "millenium-fitness", "rho-construction", "catalyst"];
const t4_hosts = ["aevum-police", "alpha-ent", "syscore", "lexo-corp", "snap-fitness", "global-pharm", "applied-energetics", "nova-med", "unitalife", "zb-def", "univ-energy"];
const t5_hosts = ["zb-institute", "solaris", "vitalife", "deltaone", "helios", "microdyne", "titan-labs", "zeus-med", "galactic-cyber", "aerocorp", "icarus", "omnia", "taiyang-digital", "infocomm", "defcomm", "omnitek", "stormtech", "4sigma", "powerhouse-fitness", "b-and-a", "blade", "clarkinc", "fulcrumtech", "kuai-gong", "nwo", "ecorp", "megacorp", "fulcrumassets"];



export async function main(ns) {
    const serverList = ns.getPurchasedServers();
    console.log(serverList);
    assignTargets(ns, serverList);
}

function assignTargets(ns, serverList) {
    let hostList = getAvailableHosts(ns);
    hostList.filter(element => ns.getHackingLevel() > ns.getServerRequiredHackingLevel(element)); //Only keep servers that can be hacked
    hostList.sort((host_a, host_b)=> ns.getServerMoneyAvailable(host_a) - ns.getServerMoneyAvailable(host_b)); //Sort lowest to highest
    for (let i = 0; i < serverList.length; i++) {
        let name = serverList[i];
        let targetHost = hostList.pop();

        ns.killall(name);
        ns.exec("hackV2.script", name, 1, targetHost); 
    }
}


function getAvailableHosts(ns){
    let portHacks = 0;
    if (ns.fileExists("BruteSSH.exe")) { portHacks++; }
    if (ns.fileExists("FTPCrack.exe")) { portHacks++; }
    if (ns.fileExists("relaySMTP.exe")) { portHacks++; }
    if (ns.fileExists("HTTPWorm.exe")) { portHacks++; }
    if (ns.fileExists("SQLInject.exe")) { portHacks++; }

    let hosts = [];
    if (portHacks >= 0) { hosts = hosts.concat(t0_hosts); }
    if (portHacks >= 1) { hosts = hosts.concat(t1_hosts); }
    if (portHacks >= 2) { hosts = hosts.concat(t2_hosts); }
    if (portHacks >= 3) { hosts = hosts.concat(t3_hosts); }
    if (portHacks >= 4) { hosts = hosts.concat(t4_hosts); }
    if (portHacks >= 5) { hosts = hosts.concat(t5_hosts); }

    return hosts;
}
