export async function main(ns) {
    ns.print("Starting script here");
    // await ns.hack("foodnstuff"); //Use Netscript hack function
    // ns.print(ns.args);           //The script arguments must be prefaced with ns as well
}


function buildServerList(ns) {
  let startingNode = "home";
  let nodes = [];
  let nodesToParse = [];

  while (nodesToParse.length > 0){
    let currentNode = nodesToParse.pop();
    if(!nodes.includes(currentNode)){
      //Get connected Nodes
      //Add to nodes to parse List
    }
    
  }
}
