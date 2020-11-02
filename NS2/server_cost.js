export async function main(ns) {
    for (let i = 1; i <= 20; i++) {
        let pwr = Math.pow(2, i);
        let cost = ns.nFormat(ns.getPurchasedServerCost(pwr),"$0.00a");
        ns.tprint(sprintf("%s : %s -- %s",i, pwr, cost));
    }
}