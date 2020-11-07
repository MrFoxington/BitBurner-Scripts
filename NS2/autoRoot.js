const hosts_t0 = ["foodnstuff", "sigma-cosmetics", "nectar-net", "joesguns", "hong-fang-tea", "harakiri-sushi"];
const hosts_t1 = ["CSEC", "zer0", "neo-net", "iron-gym", "max-hardware"];
const hosts_t2 = ["phantasy", "omega-net", "avmnite-02h", "the-hub", "johnson-ortho", "silver-helix", "crush-fitness"];
const hosts_t3 = ["rothman-uni", "catalyst", "rho-construction", "summit-uni", "comptek", "netlink", "I.I.I.I", "millenium-fitness"];
const hosts_t4 = ["aevum-police", "global-pharm", "lexo-corp", "alpha-ent", "snap-fitness", "unitalife", "syscore", "zb-def", "univ-energy", "nova-med"];


export async function main(ns) {
    ns.tprint("Starting Auto Root Script");
    run(ns);
}

function run(ns){
    let portHacks = portHacksAvailable(ns);
    if (portHacks >= 0) { rootHosts(ns, hosts_t0); }
    if (portHacks >= 1) { rootHosts(ns, hosts_t1); }
    if (portHacks >= 2) { rootHosts(ns, hosts_t2); }
    if (portHacks >= 3) { rootHosts(ns, hosts_t3); }
    if (portHacks >= 4) { rootHosts(ns, hosts_t4); }
}

function portHacksAvailable(ns){
    let portHacks = 0;
    if (ns.fileExists("BruteSSH.exe")) { portHacks++; }
    if (ns.fileExists("FTPCrack.exe")) { portHacks++; }
    if (ns.fileExists("relaySMTP.exe")) { portHacks++; }
    if (ns.fileExists("HTTPWorm.exe")) { portHacks++; }
    if (ns.fileExists("SQLInject.exe")) { portHacks++; }
    return portHacks;
}

function breakPorts(ns, hostname) {
    if (ns.fileExists("BruteSSH.exe")) { ns.brutessh(hostname) }
    if (ns.fileExists("FTPCrack.exe")) { ns.ftpcrack(hostname) }
    if (ns.fileExists("relaySMTP.exe")) { ns.relaysmtp(hostname) }
    if (ns.fileExists("HTTPWorm.exe")) { ns.httpworm(hostname) }
    if (ns.fileExists("SQLInject.exe")) { ns.sqlinject(hostname) }
}

function rootHosts(ns, hostList) {
    for (var i = 0; i < hostList.length; i++) {
        if (!ns.hasRootAccess(hostList[i])) {
            ns.tprint("Rooting " + hostList[i]);
            breakPorts(ns, hostList[i]);
            ns.nuke(hostList[i]);
        }
    }
}
