const { API_SAVE, API_VIEW, BLOCKCHAIN_URL } = require('../utils/constants');
const express = require('express');
const Web3 = require('web3');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// Creates a new connection via Web3 to Ganache blockchain
const web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_URL));

/**
 *
 * @param web3 Web3 Instance
 * @returns {Promise<Contract|>} Instance of the contract
 */
const getContract = async (web3) => {
  /*
    Step 1: set the default account to the first in the list.
    In a real world scenario, it will be predefined.
  */
  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];

  /*
    Step 2: Read the contract definition
   */
  let source = fs.readFileSync('build/contracts/Contract.json');
  source = JSON.parse(source);

  /*
  Step 3: Set corresponding network
   - abi: Contract Application Binary Interface,
          or the standard way to interact with contracts
  */
  const netId = await web3.eth.net.getId();
  const deployedNetwork = source.networks[netId];
  const contract = new web3.eth.Contract(
    source.abi,
    deployedNetwork && deployedNetwork.address
  );
  return contract;
};

app.get("/", (req, res) => {
  res.send(`Invalid api call. Try one of the following: [${API_VIEW}, ${API_SAVE}]`);
});

app.get("/" + API_VIEW, async (req, res) => {
  const contract = await getContract(web3);
  const size = await contract.methods.id().call();

  const toReturn = [];

  let searchValue = req.query.search;
  if(searchValue) {
    searchValue = searchValue.toLowerCase();
  }

  /*
    Search is made by looping all contracts and only keeping the ones that
    match the desired value
  */
  for(let i = 1; i <= size; i += 1) {
    let c = await contract.methods.map(i).call();
    if(!searchValue
      || c.f_name.toLowerCase().indexOf(searchValue) >= 0
      || c.l_name.toLowerCase().indexOf(searchValue) >= 0
      || c.mother.toLowerCase().indexOf(searchValue) >= 0
      || c.father.toLowerCase().indexOf(searchValue) >= 0) {
      toReturn.push(c);
    }
  }

  res.send(toReturn);
});

app.post("/" + API_SAVE, async (req, res) => {
  const contract = await getContract(web3);

  /*
    Create a new contract with given info, then send it to then network
    gas definition: https://support.blockchain.com/hc/en-us/articles/360027772571-What-is-gas-
    A gas unit is the smallest type of work that is processed on the Ethereum network.
    Validating and confirming transactions on the Ethereum blockchain requires a certain amount of gas,
    depending on the size and type of each transaction.
    Gas measures the amount of work miners need to do in order to include transactions in a block."
  */
  await contract.methods.createCertificate(
    req.body.f_name,
    req.body.l_name,
    req.body.mother,
    req.body.father,
    req.body.date
  ).send({from: web3.eth.defaultAccount, gas: 3000000});

  res.send(JSON.stringify({message: 'done', status: 0}));
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
