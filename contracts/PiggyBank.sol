// SPDX-License-Identifier: MIT
// author: Phace
// PiggyBank Contract
pragma solidity 0.8.0;

contract PiggyBank {
    struct Owner {
        string name;
        bool savingsStarted;
        uint256 balance;
    }

    mapping(address => Owner) internal owner;
    address public contractOwner;

    event SavingsStarted(address indexed owner, string name);
    event FundsDeposited(address indexed depositor, uint256 _amount);
    event FundsWithdrawn(address indexed owner, uint256 _amount);
    event ContractDestroyed(address indexed owner);

    constructor(string memory _name) {
        contractOwner = msg.sender;
        owner[contractOwner] = Owner({
            name: _name,
            savingsStarted: true,
            balance: 0
        });

        emit SavingsStarted(contractOwner, _name);
    }

    // sets owner modifier
    modifier onlyOwner() {
        require(msg.sender == contractOwner, "Not the owner");
        _;
    }

    // ensures that value is greater than 0
    modifier positiveValue(uint256 _value) {
        require(_value > 0, "Value must be greater than 0");
        _;
    }

    // Function to deposit funds into the PiggiBank
    function deposit() public payable positiveValue(msg.value) {
        owner[contractOwner].balance += msg.value;
        emit FundsDeposited(contractOwner, msg.value);
    }

    // Function to withdraw funds from PiggiBank
    function withdraw(uint256 _value) public onlyOwner positiveValue(_value) {
        require(owner[contractOwner].balance > 0, "Insufficient balance");
        payable(contractOwner).transfer(_value);
        owner[contractOwner].balance -= _value;

        emit FundsWithdrawn(contractOwner, _value);
    }

    // Function to check the balance of user
    function getBalance() public view returns (uint256) {
        return owner[contractOwner].balance;
    }

    // selfdestruct Function will transfer funds to owner before destroying the contract
    function destroy() public onlyOwner {
        emit ContractDestroyed(contractOwner);
        selfdestruct(payable(contractOwner));
    }
}
