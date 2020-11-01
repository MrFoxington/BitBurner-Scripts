export async function main(ns) {
    // ns.print("Starting script here");
    // await ns.hack("foodnstuff"); //Use Netscript hack function
    // ns.print(ns.args);           //The script arguments must be prefaced with ns as well
    if(ns.args.length != 2){
      ns.tprint("Invalid Argument Count");
    }else{
      let name = ns.args[0];
      let count = ns.args[1];
      await ascendMember(ns, name, count);
    }
}

async function ascendMember(ns, name, ascendNumber){
  for (var i = 0; i < ascendNumber; i++) {
   ns.gang.ascendMember(name);
   purchaseUpgrades(ns, name);
  }
}

async function purchaseUpgrades(ns, name){
  let equipment = ns.gang.getEquipmentNames();
  let equiped = ns.gang.getMemberInformation(name).equipment;
  for (var i = 0; i < equipment.length; i++) {
    var item = equipment[i];
    if (ns.gang.getEquipmentType(item) != "Augmentation" && !equiped.includes(item) ) {
      let cost = ns.gang.getEquipmentCost(item);
      //check money and wait to purchase
      let waiting = true;
      while(waiting){
          if(ns.getServerMoneyAvailable('home') > cost){
            ns.gang.purchaseEquipment(name, item);
            waiting = false;
          }else {
            await ns.sleep(20000); //20 seconds then check again
          }
      }
    }
  }
}
