const hre = require("hardhat");

async function main() {

  const name = "Phace";
  
  const PiggyBank = await hre.ethers.getContractFactory("PiggyBank");
  const piggyBank = await PiggyBank.deploy(name);

  await piggyBank.deployed();

  console.log("PiggyBank deployed to:", piggyBank.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });