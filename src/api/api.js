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

const web3 = new Web3(new Web3.providers.HttpProvider(BLOCKCHAIN_URL));

const getContract = async (web3) => {
  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];

  let source = fs.readFileSync('build/contracts/Contract.json');
  source = JSON.parse(source);

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
