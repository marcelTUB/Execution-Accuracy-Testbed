import SmartContract from "./SmartContract.json";
import web3 from "../helpers/web3Provider";
export const smartContract = new web3.eth.Contract(
  // @ts-ignore
  SmartContract.abi,
  process.env.SMART_CONTRACT_ADDRESS
);
