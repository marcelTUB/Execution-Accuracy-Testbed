// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.8.0;

contract TimeSensitiveSmartContract {
    uint256 constraintIntervalStartTime;
    uint256 public constraintIntervalDuration;
    uint256 transactionCount = 0;

    struct Transaction {
        int256 accepted;
        uint256 blockTimestamp;
    }

    mapping(uint256 => Transaction) transactions;

    constructor(uint256 duration) public {
        constraintIntervalDuration = duration;
    }

    function initSmartContractState() public {
        uint256 i;
        for (i = 0; i < transactionCount; i++) {
            delete transactions[i];
        }
        transactionCount = 0;
    }

    function getTransaction(uint256 transactionId)
        public
        view
        returns (int256, uint256)
    {
        Transaction storage transaction = transactions[transactionId];
        return (transaction.accepted, transaction.blockTimestamp);
    }

    function setConstraintIntervalStartTime(uint256 startTime) public {
        constraintIntervalStartTime = startTime;
    }

    function setConstraintIntervalDuration(uint256 duration) public {
        if (constraintIntervalDuration != duration) {
            constraintIntervalDuration = duration;
        }
    }

    function constraintFunction(uint256 transactionId) public {
        Transaction memory transaction;
        if (
            block.timestamp > constraintIntervalStartTime &&
            block.timestamp <=
            constraintIntervalStartTime + constraintIntervalDuration
        ) {
            transaction.accepted = 1;
        } else {
            transaction.accepted = -1;
        }
        transaction.blockTimestamp = block.timestamp;
        transactions[transactionId] = transaction;
        transactionCount++;
    }
}
