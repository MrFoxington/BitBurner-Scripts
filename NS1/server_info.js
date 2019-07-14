var host = args[0];

if (serverExists(host)) {
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
