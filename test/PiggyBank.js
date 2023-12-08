const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('PiggyBank', function () {
  let piggyBank;
  let owner;
  let depositor;

  beforeEach(async function () {
    [owner, depositor] = await ethers.getSigners();

    const PiggyBank = await ethers.getContractFactory('PiggyBank');
    piggyBank = await PiggyBank.deploy('Phace');
    await piggyBank.deployed();
  });

  it('should allow deposits', async function () {
    const depositAmount = ethers.utils.parseEther('1');

    await piggyBank.connect(depositor).deposit({ value: depositAmount });

    const balance = await piggyBank.getBalance();
    expect(balance).to.equal(depositAmount, 'Balance not updated correctly after deposit');
  });

  it('should allow withdrawals by the owner', async function () {
    const depositAmount = ethers.utils.parseEther('1');
    const withdrawalAmount = ethers.utils.parseEther('0.5');

    await piggyBank.connect(depositor).deposit({ value: depositAmount });

    const initialBalance = await piggyBank.getBalance();

    await piggyBank.connect(owner).withdraw(withdrawalAmount);

    const finalBalance = await piggyBank.getBalance();
    expect(finalBalance).to.equal(initialBalance.sub(withdrawalAmount), 'Balance not updated correctly after withdrawal');
  });

  it('should destroy the contract and transfer funds to the owner', async function () {
    const depositAmount = ethers.utils.parseEther('1');

    await piggyBank.connect(depositor).deposit({ value: depositAmount });

    const initialBalanceOwner = await ethers.provider.getBalance(owner.address);

    await piggyBank.connect(owner).destroy();

    const finalBalanceOwner = await ethers.provider.getBalance(owner.address);
    expect(finalBalanceOwner).to.be.gt(initialBalanceOwner, 'Funds not transferred to the owner');
  });
});
