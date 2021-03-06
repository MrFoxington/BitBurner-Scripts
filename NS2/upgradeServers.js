export async function main(ns) {
    const newRam = Math.pow(2, ns.args[0]);
    const serverList = init(ns);
    console.log(serverList);
    await upgrade(ns, newRam, serverList);
}

function init(ns) {
    return ns.getPurchasedServers();
}

async function upgrade(ns, newRam, serverList) {
    for (let i = 0; i < serverList.length; i++) {

        let name = serverList[i];
        // console.log(serverList)
        // console.log(ns.getServerRam(name));

        if (ns.getServerRam(serverList[i])[0] < newRam) {
            let ps = ns.ps(name); //Get running programs on server
            let waiting = true;
            while (waiting) {
                if (ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(newRam)) {
                    ns.killall(name);
                    ns.deleteServer(name);
                    ns.purchaseServer(name, newRam);
                    if (ps.length > 0) {
                        ns.scp(ps[0].filename, name); //Copy old scripts to new server
                        await ns.exec(ps[0].filename, name, 1, ps[0].args[0]); //Restart old script (assumption that top process is main hack script)
                    }
                    waiting = false;
                }
                await ns.sleep(10000);
            }
        }
    }
}
