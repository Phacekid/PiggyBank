## PiggyBank Contract

This is a PiggyBank contract using Hardhat, to compile and hardhat-waffle test.
The contract was deployed on [Sepolia Testnet](https://sepolia.etherscan.io/address/0xFdFadD6032F28cF87026A0a18D7cf8d889f0D45a)

#### WALKTHROGH
- After running `npm install`
- You need to setup your environment variables by renaming _.env.example_ to _.env_, then replace the uppercase keywords with their actual keys and links  [ETHERSCAN_KEY](https://etherscan.io/apis), PRIVATE_KEY from [metamask](https://metamask.io/) and [INFURA_LINK](https://www.infura.io/)
- You'll also need sepolia test ETH for deployment which can be gotten from various faucets like: [sepoliafaucet](https://sepoliafaucet.com/), [infurafaucet](https://www.infura.io/faucet/sepolia)

#### SHELL COMMANDS
- To compile the PiggyBank.sol

`npx hardhat compile`
- To test the contract

`npx hardhat test`
- To deploy to sepolia testnet

```npx hardhat run scripts/deploy.js --network sepolia```