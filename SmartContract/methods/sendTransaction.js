import { transactions } from "../..";
import { smartContract } from "../SmartContract";
/**
 * Sends a transactions to the Smart Contract that invokes the temporal
 * constrained functionality of the Smart Contract
 * @param sender - sender of the transaction
 * @param transactionId - id that identifies the transaction
 * @param estimatedGas - the estimated gas used up per transaction
 */
export const sendTransaction =  (sender, transactionId, estimatedGas) => {

  const transaction = {
    id: transactionId,
    initialTimestamp: Date.now()
  };
  transactions[transactionId] = transaction;
  return smartContract.methods
    .constraintFunction(transactionId)
    .send(
      { from: sender, gas: estimatedGas},
      () => {}
    )
    .on("transactionHash", (hash) => {
      transactions[transactionId] = {
        ...transactions[transactionId],
        hash: hash
      };
    })
    .on("error", (error,receipt) =>{
    console.log(error)
    console.log(receipt)
  })

};
