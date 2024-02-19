const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


const myKey = ec.keyFromPrivate('4aa3c755e34c45fa5b5ad58e8afc80038de0eeb57647c517d273640cb91bc703');
const myWalletAddress = myKey.getPublic('hex');

let coin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 100);
tx1.signTransaction(myKey);
coin.addTransaction(tx1);

coin.minePendingTransactions(myWalletAddress);

const tx2 = new Transaction(myWalletAddress, 'public key goes here', 50);
tx2.signTransaction(myKey);
coin.addTransaction(tx2);

console.log('\n Starting the miner...');
coin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of xavier is', coin.getBalanceOfAddress(myWalletAddress));

// coin.chain[1].transactions[0].amount = 1;

console.log('Is chain valid?', coin.isChainValid());