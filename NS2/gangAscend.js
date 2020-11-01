export async function main(ns) {
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
    ns.print(sprintf("%s Ascention #%s of %s", name, i, ascendNumber));
    ns.gang.ascendMember(name);
    await purchaseUpgrades(ns, name);
    if (i % 100 == 0) { await ns.sleep(1); } //Pause every 100 ascentions to stop game lagging out
  }
}

//Purchases all available upgrades
// - Get all Equipment
// - Get Member Equipment
// - If not Augment and not Equiped
//    - Wait till available money and buy
//    - Repeat till no more available to purchase
async function purchaseUpgrades(ns, name){
  let equipment = ns.gang.getEquipmentNames();
  let equiped = ns.gang.getMemberInformation(name).equipment;
  for (var i = 0; i < equipment.length; i++) {
    var item = equipment[i];
    if (ns.gang.getEquipmentType(item) != "Augmentation" && !equiped.includes(item) ) {
      let cost = ns.gang.getEquipmentCost(item);
      
      //Check money and wait to purchase
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
