import { smartContract } from "../SmartContract";
/**
 * Sets the start time of the temporal constrained functionality
 * @param sender - sender of the transaction
 * @param startTime - start time
 */
export const setConstraintIntervalStartTime = async (sender, startTime) => {
 try{
  const estimatedGas = await smartContract.methods
    .setConstraintIntervalStartTime(startTime)
    .estimateGas({ from: sender });

  return smartContract.methods
    .setConstraintIntervalStartTime(startTime)
    .send({ from: sender, gas: estimatedGas })
}catch(error){
  console.log(error)
}};