var hosts_t0 = ["foodnstuff", "sigma-cosmetics", "nectar-net", "joesguns", "hong-fang-tea", "harakiri-sushi","CSEC", "zer0", "neo-net", "iron-gym", "max-hardware"];
var hosts_t2 = ["phantasy", "omega-net", "avmnite-02h", "the-hub", "johnson-ortho", "silver-helix", "crush-fitness"];
var hosts_t3 = ["rothman-uni", "catalyst", "rho-construction", "summit-uni", "comptek", "netlink", "I.I.I.I", "millenium-fitness"];
var hosts_t4 = ["aevum-police", ];

var portHacks = 0;
if (fileExists("BruteSSH.exe")) { portHacks++ }
if (fileExists("FTPCrack.exe")) { portHacks++ }
if (fileExists("relaySMTP.exe")) { portHacks++ }
if (fileExists("HTTPWorm.exe")) { portHacks++ }
if (fileExists("SQLInject.exe")) { portHacks++ }

function breakPorts(hostname) {
    if (fileExists("BruteSSH.exe")) { brutessh(hostname) }
    if (fileExists("FTPCrack.exe")) { ftpcrack(hostname) }
    if (fileExists("relaySMTP.exe")) { relaysmtp(hostname) }
    if (fileExists("HTTPWorm.exe")) { httpworm(hostname) }
    if (fileExists("SQLInject.exe")) { sqlinject(hostname) }
}

function rootHosts(hostList){
  for (var i = 0; i < hostList.length; i++) {
    if(!hasRootAccess(hostList[i])) {
      breakPorts(hostList[i]);
      nuke(hostList[i]);
    }
  }
}
 var
while(count < 5){
  if(portHacks >= 0){rootHosts(hosts_t0)}
  if(portHacks >= 1){rootHosts(hosts_t1)}
  if(portHacks >= 2){rootHosts(hosts_t2)}
  if(portHacks >= 3){rootHosts(hosts_t3)}
  if(portHacks >= 4){rootHosts(hosts_t4)}
}

var host = args[0]

if (serverExists()) {
    tprint("Stat Readout for " + host);
    tprint("Hacking Req: " + getServerRequiredHackingLevel(host));
    tprint("Hacking Ports: " + getServerNumPortsRequired(host));
    tprint("Server Ram: " + getServerRam(host));
    tprint("Growth Rate: " + getServerGrowth(host));
    tprint("Hack %: " + hackAnalyzePercent(host));
    tprint("Max Money: " + getServerMaxMoney(host));
    tprint("Money: " + getServerMoneyAvailable(host));
    tprint("Min Security: " + getServerMinSecurityLevel(host));
    tprint("Security: " + getServerSecurityLevel(host));
} else {
    tprint("Invalid Host: " + host);
}
