/**
 * estimates the gas that is needed to execute a transaction
 * @param sender - sender of the transaction
 * @returns {number} - estimated gas
 */

import web3 from "../../helpers/web3Provider";
import { smartContract } from "../SmartContract";

export const estimateGas = async (sender) => {

  try {
    return await smartContract.methods
      .constraintFunction(0)
      .estimateGas({ from: sender });
  } catch (error) {}
};
