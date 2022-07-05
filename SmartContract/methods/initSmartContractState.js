import { getRevertReason } from "../../helpers/getRevertReason";
import { smartContract } from "../SmartContract";
/**
 * Sets the start time of the temporal constrained functionality
 * @param sender - sender of the transaction
 * @param duration - start time
 */
export const initSmartContractState = async (sender) => {
 try{
  const estimatedGas = await smartContract.methods
    .initSmartContractState()
    .estimateGas({ from: sender });

  return smartContract.methods
    .initSmartContractState()
    .send({ from: sender, gas: estimatedGas *3})
    .on("error", (error,receipt) =>{
      console.log(error)
      getRevertReason(receipt.transactionHash)
    })
}catch(error){
  console.log(error)
}
};
