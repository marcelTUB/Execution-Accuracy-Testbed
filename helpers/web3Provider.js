import HDWalletProvider from "@truffle/hdwallet-provider";
const Web3 = require("web3");

let web3;
/*connect to provider depending on the selected network upon the setup */
if (process.env.CHAIN == "ropsten"){
    const provider = new Web3(new HDWalletProvider(
        process.env.MNEMONIC,
        `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`
    ));
    web3 = new Web3(provider);
}
else if (process.env.CHAIN == "goerli"){
    const provider = new Web3(new HDWalletProvider(
        process.env.MNEMONIC,
        `wss://goerli.infura.io/ws/v3/${process.env.PROJECT_ID}`
    ));
    web3 = new Web3(provider);
}
else if (process.env.CHAIN == "rinkeby"){
    const provider = new Web3(new HDWalletProvider(
        process.env.MNEMONIC,

        `wss://rinkeby.infura.io/ws/v3/${process.env.PROJECT_ID}`
    ));
    web3 = new Web3(provider);
}
else if (process.env.CHAIN == "custom"){
    web3 = new Web3(`http://${process.env.HOST}:${process.env.PORT}`);
}
else
    web3 = new Web3("http://127.0.0.1:8545");

export default web3;
