const t0_hosts = ["foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", "harakiri-sushi"];
const t1_hosts = ["neo-net", "zer0", "max-hardware", "iron-gym"];
const t2_hosts = ["phantasy", "silver-helix", "omega-net", "crush-fitness", "johnson-ortho", "the-hub"];
const t3_hosts = ["comptek", "rothman-uni", "netlink", "summit-uni", "millenium-fitness", "rho-construction", "catalyst"];
const t4_hosts = ["aevum-police", "alpha-ent", "syscore", "lexo-corp", "snap-fitness", "global-pharm", "applied-energetics", "nova-med", "unitalife", "zb-def", "univ-energy"];
const t5_hosts = ["zb-institute", "solaris", "vitalife", "deltaone", "helios", "microdyne", "titan-labs", "zeus-med", "galactic-cyber", "aerocorp", "icarus", "omnia", "taiyang-digital", "infocomm", "defcomm", "omnitek", "stormtech", "4sigma", "powerhouse-fitness", "b-and-a", "blade", "clarkinc", "fulcrumtech", "kuai-gong", "nwo", "ecorp", "megacorp", "fulcrumassets"];


export async function main(ns) {
    ns.print("Starting Coding Contracts Script");
    findContracts(ns);
    ns.tprint("Finished Contracts execution");
}

function findContracts(ns) {
    let serverList = getAvailableServers(ns);
    for (let i = 0; i < serverList.length; i++) {
        const host = serverList[i];
        let files = ns.ls(host, ".cct");
        files.forEach(element => {
            let type = ns.codingcontract.getContractType(element, host);
            let desc = ns.codingcontract.getDescription(element, host);
            let data = ns.codingcontract.getData(element, host);
            ns.tprint(sprintf("%s : %s", host, element));
            ns.tprint(sprintf("\nType: %s \nDescription: %s \nData: %s", type, desc, data));
        });
    }
}

function getAvailableServers(ns){
    let portHacks = 0;
    if (ns.fileExists("BruteSSH.exe")) { portHacks++; }
    if (ns.fileExists("FTPCrack.exe")) { portHacks++; }
    if (ns.fileExists("relaySMTP.exe")) { portHacks++; }
    if (ns.fileExists("HTTPWorm.exe")) { portHacks++; }
    if (ns.fileExists("SQLInject.exe")) { portHacks++; }

    let servers = [];
    if (portHacks >= 0) { servers = servers.concat(t0_hosts); }
    if (portHacks >= 1) { servers = servers.concat(t1_hosts); }
    if (portHacks >= 2) { servers = servers.concat(t2_hosts); }
    if (portHacks >= 3) { servers = servers.concat(t3_hosts); }
    if (portHacks >= 4) { servers = servers.concat(t4_hosts); }
    if (portHacks >= 5) { servers = servers.concat(t5_hosts); }

    return servers;
}