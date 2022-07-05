export async function getRevertReason(txHash){

    const tx = await web3.eth.getTransaction(txHash)

    var result = await web3.eth.call(tx, tx.blockNumber)

    result = result.startsWith('0x') ? result : `0x${result}`

    if (result && result.substr(138)) {

      const reason = web3.utils.toAscii(result.substr(138))
      console.log('Revert reason:', reason)
      return reason

    } else {

      console.log('Cannot get reason - No return value')

    }

  }
