/**
 * Generates the output file and writes the experiment data to it.
 * The output file is in JSON format.
 *
 * @param {object} data
 * @returns {object}
 */

"use strict";
const fs = require("fs");


export const generateOutput = (data) => {

let blocktimeExtra = ""
if(process.env.BLOCKTIME && process.env.BLOCKTIME !== ""){
   blocktimeExtra = `${process.env.BLOCKTIME}/`
}

const path = `generatedData/${process.env.CHAIN}/${blocktimeExtra}${process.env.ConstraintIntervalDuration}/${process.env.TransactionRate}`

  if (!fs.existsSync(path)){
    fs.mkdirSync(path, { recursive: true });
}


  let output = JSON.stringify(data);
  fs.writeFileSync(
    `${path}/${Date.now()}.json`,
    output
  );
};
