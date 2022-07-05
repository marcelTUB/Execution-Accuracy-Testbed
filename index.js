import { setConstraintIntervalStartTime } from "./SmartContract/methods/setConstraintIntervalStartTime";
import { sendTransaction } from "./SmartContract/methods/sendTransaction";
import { getTransaction } from "./SmartContract/methods/getTransaction";
import { generateOutput } from "./helpers/generateOutput";
import { estimateGas } from "./SmartContract/methods/estimateGas";
import web3 from "./helpers/web3Provider";
import { initSmartContractState } from "./SmartContract/methods/initSmartContractState";
import { smartContract } from "./SmartContract/SmartContract";
import { setConstraintIntervalDuration } from "./SmartContract/methods/setConstrainIntervalDuration";

const ConstraintIntervalDuration = parseInt(process.env.CONSTRAINT_INTERVAL_DURATION,10);
const PreceedingSeconds = parseInt(process.env.PRECEEDING_SECONDS,10) //seconds preceeding the constraint intveral
const TransactionRate = parseInt(process.env.TRANSACTION_RATE,10) // transactions send per second
const followingSeconds = 15 //seconds following the constraint intveral

const totalNumOfTransaction = (PreceedingSeconds + followingSeconds + ConstraintIntervalDuration) * TransactionRate;
let constraintIntervalStartTime, currentTime, estimatedGas, experimentStartTime, sender;
let currentTransactionId = 0;
console.log(totalNumOfTransaction)

export let transactions = new Array(totalNumOfTransaction); // array of transaction objects

/**
 * Send transactions periodically every 1000/TransactionRate seconds.
 * Increase the transaction Id after a transaction is dispatched. Stop when all transactions are sent
 */
const run = async () => {
  console.log("Start sending transactions");


  let numOfProcessedTransactions = 0;
  const interval = setInterval(async () => {
    if (currentTransactionId === totalNumOfTransaction) {
      clearInterval(interval);
      console.log("wait until all transactions are processed and mined within blocks before results and associated blockTimestamps are fetched from Smart Contract")

      //fetch result from Smart Contract when all transaction receipts are received
        const checkInterval = setInterval(async () => {
          if(transactions[numOfProcessedTransactions].hasOwnProperty("hash")){
            var receipt = web3.eth.getTransactionReceipt(transactions[numOfProcessedTransactions].hash)
            if(receipt) numOfProcessedTransactions = numOfProcessedTransactions +1;
          }
          console.log(numOfProcessedTransactions)

          if(numOfProcessedTransactions === totalNumOfTransaction-1){
            clearInterval(checkInterval);
            console.log("wait 60 seconds")

            await new Promise(resolve => setTimeout(resolve, 60000));

            console.log("request result from Smart Contract")
            const result = await Promise.all(transactions.map(async tx => {
              return getTransaction(tx.id)
            }))

            //assign result and blockTimestamp to corresponding transaction
            transactions.map((tx, index) => {
              tx.result = result[index]["0"];
              tx.blockTimestamp = result[index]["1"];
              delete tx.hash;
            });

            console.log("generate JSON output file");
            generateOutput({
              constraintIntervalStartTime: constraintIntervalStartTime,
              constraintIntervalDuration: ConstraintIntervalDuration,
              transactionRate: TransactionRate,
              transactions: transactions
            });
          }
        }, 50);

    }
    else{
      console.log(currentTransactionId)
      sendTransaction(sender, currentTransactionId, estimatedGas);
      currentTransactionId++;
    }
  }, 1000/TransactionRate);
};

/**
 * initalizes the experiment. Existing data is removed from the Smart Contract state,
 * the gas used up for one transaction is estimated in advance and
 * the experiment start is calculated and set
 */
const initialize = async () => {

  // use the first account from wallet as transaction sender
  const accounts =  await web3.eth.getAccounts();
  sender = accounts [0]
  const balance = await web3.eth.getBalance(sender)
  console.log("current account balance:" + balance)

  console.log("initalize Smart Contract state");

  await initSmartContractState(sender)
  console.log("done");

  //  update the cnstraint interval duration if it differs from the duration stored in the Smart Contract state
  const storedIntervalDuration = await smartContract.methods.constraintIntervalDuration().call()
  if(storedIntervalDuration !== ConstraintIntervalDuration){
    console.log(`set new intervalDuration to ${ConstraintIntervalDuration} seconds`)
    await setConstraintIntervalDuration(sender, ConstraintIntervalDuration)
  }
  //estimate gas for first transaction and use its value for all coming transaction
  console.log("estimate gas")
  estimatedGas = await estimateGas(sender);
  estimatedGas = Math.floor(estimatedGas * 1.5)
  const currentGasPrice = await web3.eth.getGasPrice()
  const estimatedPossibleExperimentExecution = balance / (totalNumOfTransaction * estimatedGas  * currentGasPrice)

  console.log("estimated gas per transaction: " + estimatedGas);
  console.log(`estimated number of possible experiment executions with current funds: ${estimatedPossibleExperimentExecution}`)

  currentTime = Math.floor(Date.now() / 1000); // get UTC in seconds

  /* set exeriment start, leaving enough time to mine the transaction which sets the constraint interval limits
     and gives experiment more randomness for constant blocktimes if multiple experiments are executed in a row*/
  experimentStartTime = currentTime +  Math.floor(Math.random() * (60 - 55 + 1) + 55);
  constraintIntervalStartTime = experimentStartTime + PreceedingSeconds;

  console.log(
    "set experiment start to: " +
      experimentStartTime +
      "(" +
      new Date(experimentStartTime * 1000).toISOString() +
      ")"
  );
  await setConstraintIntervalStartTime(sender, constraintIntervalStartTime);
  console.log("done");
};

const main = async () => {

  await initialize();
  const milliSecondsToExperimentStart = experimentStartTime * 1000 - Date.now()
  console.log(`wait ${Math.round(milliSecondsToExperimentStart/1000)} seconds for the experiment to start`);
  setTimeout(() => {
    console.log("start at: " + Date.now());
    run();
  }, milliSecondsToExperimentStart);
};

main();
