export async function main(ns) {
    ns.print("Starting script here");
    await ns.hack("foodnstuff"); //Use Netscript hack function
    ns.print(ns.args);           //The script arguments must be prefaced with ns as well
}

//Note: This Script will assume availablity of optimal RAM space.
  // Minimal ram monitoring will be in place to stop errors but no way to compensate.
  // It's either qued or parallen, not sure how to do both yet
  // Extraction of Hack and Grow Threads would make this run mroe efficiently and flexible.
    // Requires more information to handle and more mistakes that can happen


//Prepare Environment
  // 1. Check if hack,grow,weaken scripts are on server
  // 2. Aquire scripts from Home if required
  // 3. Establish all Const Variables

//Prepare target
  // 1. Weaken to Min Security
  // 2. Grow till Max Money
  // 3. Always Weaken when above Min security

//Calculate Optimal threads
  // 1. Determin Threads required to Hack % of Max Money
  // 2. Determin Threads required to Grow to Max Money
    // 2.a. Change in security from Hack will require more Grow threads
  // 3. Determin Threads required to Weaken to Min Security
  // Note: Will need to extract Growth Formula to manualy calculate Grow Thread with adjusted security lvls


//Execute operations
  // 1. Calculate time of each operations
  // 2. Determin longest operation
  // 3. Stagger operations to resolve in appropriate order
  // 4. Execute operations with appropriate staggered timming
