import { getHostTier } from ./serverUtil;

export async function main(ns) {
    ns.print("Starting script here");
    //await ns.hack("foodnstuff"); //Use Netscript hack function
    ns.print(ns.args);           //The script arguments must be prefaced with ns as well
    ns.tprint(getHostTier(0));
}
