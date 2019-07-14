
ServerBaseGrowthRate: 1.03,     // Unadjusted Growth rate
ServerMaxGrowthRate: 1.0035,    // Maximum possible growth rate (max rate accounting for server security)

//server.hackDifficulty is just the server security lvl
//server.serverGrowth is something intrinsic to the server (can get with simple check)
// growth = amount server should grow by (multiplier)
// p.hacking_grow_mult = player hacking BitNodeMultipliers
// BitNodeMultipliers.ServerGrowthRate = more multipliers

server.serverGrowth = 5
BitNodeMultipliers.ServerGrowthRate = 1
p.hacking_grow_multi = 1

export function numCycleForGrowth(server: Server, growth: number, p: IPlayer) {
    let ajdGrowthRate = 1 + (CONSTANTS.ServerBaseGrowthRate - 1) / server.hackDifficulty;
    if(ajdGrowthRate > CONSTANTS.ServerMaxGrowthRate) {
        ajdGrowthRate = CONSTANTS.ServerMaxGrowthRate;
    }

    const serverGrowthPercentage = server.serverGrowth / 100;

    const cycles = Math.log(growth)/(Math.log(ajdGrowthRate) * p.hacking_grow_mult * serverGrowthPercentage * BitNodeMultipliers.ServerGrowthRate);


    // cycles = Math.log(growth)/(Math.log(a)*b*c*d);
    // c = log(x) / y
    // log(x) = c * y
    // x = e^cy


    return cycles;
}

var serverBaseGrowthRate = 1.03;     // Unadjusted Growth rate
var serverMaxGrowthRat = 1.0035;    // Maximum possible growth rate (max rate accounting for server security)
var serverGrowth = 5;               // Found in server details
var serverHackDifficulty = 3;       //Server current security lvl
var bitNode_ServerGrowth = 1;       // player specific multiplier (hardcode for now?)
var playerGrowMulti = 1             // player multiplier (can be obtained)

function maxGrowthForCycles(cycles) {
    var ajdGrowthRate = 1 + (serverBaseGrowthRate - 1) / serverHackDifficulty;
    if(ajdGrowthRate > serverMaxGrowthRate) {
        ajdGrowthRate = s erverMaxGrowthRate;
    }

    var serverGrowthPercentage = serverGrowth / 100;

    var growth = Math.exp(Math.E,(cycles * (Math.log(ajdGrowthRate) * playerGrowMulti * serverGrowthPercentage * bitNode_ServerGrowth)));
    return growth;

}
