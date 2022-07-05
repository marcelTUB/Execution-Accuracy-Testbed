# #!/bin/bash

# install node packages
#npm install

blockchainDotenvFile=./network/4-nodes-istanbul-tessera-docker-compose/.env

echo Welcome, these instructions will help you to run the experiment.

echo Enter the duration from the start of the experiment to lower limit of the constraint interval
read preceedingSeconds
echo PRECEEDING_SECONDS=$preceedingSeconds >> .env


echo Enter constraint interval duration
read duration
echo CONSTRAINT_INTERVAL_DURATION=$duration >> .env


echo Enter transaction rate
read rate
echo TRANSACTION_RATE=$rate >> .env

# Prompts the user to select the blockchain
select b in ropsten goerli rinkeby ganache custom
do
blockchain=$b
break
done


if [ "$blockchain" = "ganache" ]; then
    echo CHAIN = ganache >> .env
    npx truffle migrate --network ganache

elif [ "$blockchain" = "ropsten" ]; then
    # write node url and account address to .env file
    echo CHAIN = ropsten >> .env
    echo NETWORK_ID = 3 >> .env

    echo Enter your infura project ID
    read projectid
    echo PROJECT_ID = $projectid >> .env

    echo Enter your unique mnemonic
    read mnemonic
    echo MNEMONIC = $mnemonic >> .env

    truffle migrate --network ropsten

elif [ "$blockchain" = "rinkeby" ]; then
    echo CHAIN = rinkeby >> .env
    echo NETWORK_ID = 4 >> .env

    echo Enter your infura project ID
    read projectid
    echo PROJECT_ID = $projectid >> .env

    echo Enter your unique mnemonic
    read mnemonic
    echo MNEMONIC = $mnemonic >> .env

    npx truffle migrate --network rinkeby --reset


elif [ "$blockchain" = "goerli" ]; then
    echo CHAIN = goerli >> .env
    echo NETWORK_ID = 5 >> .env

    echo Enter your infura project ID
    read projectid
    echo PROJECT_ID = $projectid >> .env

    echo Enter your unique mnemonic
    read mnemonic
    echo MNEMONIC = $mnemonic >> .env

    npx truffle migrate --network goerli --reset


elif [ "$blockchain" = "custom" ]; then
    echo CHAIN = custom >> .env

    echo Enter custom node host you wish to connect to
    read host
    echo HOST=$host >> .env

    echo Enter custom node port you wish to connect to
    read port
    echo PORT=$port>> .env

    truffle migrate --network custom --reset
else
echo blub
fi

