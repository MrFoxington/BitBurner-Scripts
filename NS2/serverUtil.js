t0_hosts = ["foodnstuff", "sigma-cosmetics", "joesguns", "nectar-net", "hong-fang-tea", "harakiri-sushi"]
t1_hosts = ["neo-net", "zer0", "max-hardware", "iron-gym"]
t2_hosts = ["phantasy", "silver-helix", "omega-net", "crush-fitness", "johnson-ortho", "the-hub"]
t3_hosts = ["comptek", "rothman-uni", "netlink", "summit-uni", "millenium-fitness", "rho-construction", "catalyst"]
t4_hosts = ["aevum-police", "alpha-ent", "syscore", "lexo-corp", "snap-fitness", "global-pharm", "applied-energetics", "nova-med", "unitalife", "zb-def", "univ-energy"]
t5_hosts = ["zb-institute", "solaris", "vitalife", "deltaone", "helios", "microdyne", "titan-labs", "zeus-med", "galactic-cyber", "aerocorp", "icarus", "omnia", "taiyang-digital", "infocomm", "defcomm", "omnitek", "stormtech", "4sigma", "powerhouse-fitness", "b-and-a", "blade", "clarkeinc", "fulcrumtech", "kuai-gong", "nwo", "ecorp", "megacorp", "fulcrumassets"]

export function getHostTier(tier:0){
  switch (tier) {
    case 0:
      return t0_hosts;
    case 1:
      return t1_hosts;
    case 2:
      return t2_hosts;
    case 3:
      return t3_hosts;
    case 4:
      return t4_hosts;
    case 5:
      return t5_hosts;
    default:
      return null;
  }
}
