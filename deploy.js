const dotenv = require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  process.env.WALLET_KEY,
  process.env.RINKEBY_TEST
);

//creates new instance of web3 and connects it to the provider
const web3 = new Web3(provider);

const deploy = async () => {

  let accounts;
  console.log('Running Deploy....')

  //attenpts to get list of accounts
  try {
    accounts = await web3.eth.getAccounts();
    if(!accounts){
      console.log('No accounts found');
    }
  } 
  catch(err) {
    console.log(err);
  }
  
  //deploys contract with 1st account from list
  console.log('Attemping to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi There'] })
    .send({ gas: 1000000, from: accounts[0] });

  console.log('deployed at:', result.options.address);
};


//deploys the contract
deploy();

