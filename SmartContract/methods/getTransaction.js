import { smartContract } from "../SmartContract";

/**
 * Queries the result and the blocktimestamp of the transaction with the given transactionID from the Smart Contract
 * @param transactionId - the id specifying the transaction
 * @returns {Object} - result and blocktimestamp
 */
export const getTransaction = async (transactionId) =>{
    return await smartContract.methods
      .getTransaction(transactionId)
      .call()

};
