const dotenv = require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  process.env.WALLET_KEY,
  process.env.RINKEBY_TEST
);

const web3 = new Web3(provider);

const deploy = async () => {

  let accounts

  console.log('Running Deploy....')

  try {
    accounts = await web3.eth.getAccounts();
    if(!accounts){
      console.log('No accounts found');
    }
  } catch(err) {
    console.log(err)
  }
  

  console.log('Attemping to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi There'] })
    .send({ gas: 1000000, from: accounts[0] });

  console.log('deployed at:', result.options.address);
};

deploy();

