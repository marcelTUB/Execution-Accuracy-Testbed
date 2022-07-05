if [ $# -eq 0 ]
  then
    echo "Pass the name of network where you want to deploy the smart contract as the first argument"
    exit
fi
if [ "$1" = "ganache" ]; then
     truffle migrate --network ganache --reset
elif [ "$1" = "ropsten" ]; then
    npx truffle migrate --network ropsten --reset
elif [ "$blockchain" = "rinkeby" ]; then
    npx truffle migrate --network rinkeby --reset
elif [ "$1" = "goerli" ]; then
    npx truffle migrate --network goerli --reset
elif [ "$1" = "custom" ]; then
    npx truffle migrate --network custom --reset
else
    exit
fi