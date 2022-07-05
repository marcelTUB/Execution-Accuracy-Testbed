("use strict");
const fs = require("fs");

const TimeSensitiveSmartContract = artifacts.require(
  "TimeSensitiveSmartContract"
);

module.exports = async function (deployer) {
  await deployer.deploy(TimeSensitiveSmartContract, process.env.CONSTRAINT_INTERVAL_DURATION);
  const _TimeSensitiveSmartContract =
    await TimeSensitiveSmartContract.deployed();

  fs.readFile(".env", (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    fs.writeFile(
      ".env",
      data + `SMART_CONTRACT_ADDRESS=${_TimeSensitiveSmartContract.address}`,
      function (err) {
        if (err) return console.log(err);
      }
    );  })


};
