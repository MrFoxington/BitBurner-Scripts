const serverList;
const newRam;
export async function main(ns) {
    // const ps = ns.ps("home");
    // for (let i = 0; i < ps.length; ++i) {
    //     ns.tprint(ps[i].filename + ' ' + ps[i].threads);
    //     ns.tprint(ps[i].args);
    // }

    newRam = Math.pow(2 , ns.args[0]);
    init(ns);
    upgrade(ns);
}

function init(ns){
  serverList = ns.getPurchasedServers();
}

function upgrade(ns){
  for (let i = 0; i < serverList.length; i++) {
    if (getPurchasedServerMaxRam(serverList[i]) < newRam ){
      let name = serverList[i];
      let ps = ns.ps(name);
      let waiting = true
      while(waiting){
        if(ns.getServerMoneyAvailable('home') > ns.getPurchasedServerCost(ram)){
          ns.killall(name);
          ns.deleteServer(name);
          ns.purchaseServer(name, newRam);
          ns.scp(ps.filename, name);
          exec(ps.filename, name, 1, ps.args[0]);
          waiting = false;
        }
        ns.sleep(10000)
      }
    }
  }
}
