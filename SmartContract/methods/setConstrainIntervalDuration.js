import web3 from "../../helpers/web3Provider";
import { smartContract } from "../SmartContract";

/**
 * Sets the duration of the constrained functionality
 * @param sender - sender of the transaction
 * @param duration - duration of the time the temporal constrained functionality of the Smart Contract is active
 */
 export const setConstraintIntervalDuration = async (sender, duration) => {
  try{
  const estimatedGas = await smartContract.methods
    .setConstraintIntervalDuration(duration)
    .estimateGas({ from: sender});

    return smartContract.methods
      .setConstraintIntervalDuration(duration)
      .send({ from: sender, gas: estimatedGas *2})
  }catch(error){
    console.log(error);
  }
};