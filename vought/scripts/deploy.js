const hre = require("hardhat");

async function main() {
  const Seamless = await hre.ethers.getContractFactory("Seamless");
  const seamless = await Seamless.deploy();
  await seamless.deployed();

  const seamlessAddress = seamless.address;
  console.log(`Seamless address: ${seamlessAddress}`);

  const MatchTicket = await hre.ethers.getContractFactory("MatchTicket");
  const matchTicket = await MatchTicket.deploy(seamlessAddress);

  const matchTicketAddress = matchTicket.address;
  console.log(`MatchTicket address: ${matchTicketAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
