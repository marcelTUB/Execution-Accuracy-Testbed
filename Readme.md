# Intro

This project is part of the bachleor thesis

<b> On the Accuracy of Block-Timestamp-based Time-sensitive
Smart Contracts on Private Permissioned Ethereum Blockchains </b>

and provides the code needed to reproduce the result described in the thesis.
The exeriment setup consist of a blockchain on which we deploy a time-sensitive Smart Contract and a script that sends transactions to the blockchain to request the computation of the temporal constrained function defined in the Smart Contract. Output files are generated during the experiment, each file containing the result of one execeution. A Jupyter Notebook is used to read the output files and visualize the result. The plots are used in the Evaluation Chapter. A more detailed sequence of the experiment is sown in Figure (1).

![sequence](images/sequence.gif)
_Figure 1. Sequence diagram visualising the flow of the experiment._

## 1. Prerequesties

1. Clone the repository

```
git clone git@github.com:marcelTUB/BachelorThesisCode.git
```

2. Navigate to project root directory

```
cd BachelorThesisCode
```

3. switch to branch master

```
git checkout master
```

List of dependencies

node, tested with version v12.7.0
npm, tested with version 7.19.1
Docker, tested with version 1.29.2, build 5becea4c
Docker-Compose, tested with 20.10.8, build 3967b7d

You can automatically install the required programs using the installation script. If you have any problems, follow the official documentation from the developer.

```
./install.sh
```

## 2. Setup

1. Start the setup script by running following command in the project root direcotry.

```
./setup.sh
```

The script uses npm to install further nodejs packages.

2. Follow the Instructions

Answer the questions prompted in the console.


It generates a .env file in the root directory.

### 3. Configure Experiment-Start-Block-Offset in .env file

Open the .env file in the root directory.

```JS
EXPERIMENT_START_BLOCK_OFFSET=
```

## 3. Start Experiment

In project root directory run:

```
npm start
```

![Experiment](images/experiment.png)
_Figure 3. Logs from experiment after running npm start_

The script generates an output file that contains the data from one execution. The file is saved in /generatedData. The filename is the UTC in seconds. The experiment will restart automatically. If you want to end the experiment you have to do it manually (CTRL+C).

## 4. Generate Evaluation Plots

In root directory double click on Evaluation.ipynb.
Juypter notebook should open automatically.
Change the configuration in the second block of the jupyter notebook to select the blockchain configuration you want to create plots for.

![Jupyter](images/notebook.png)
_Figure 4. Lines that have to be configured in the Jupyter notebook in order to select the blockchain configurations to be processed_

Note: The Jupyter notebook was tested with the following blockchain configuration. Some functions may not work properly if different configurations are used.

Schema {blocktime: [ recommitIntervals ]}

```py
configuration={6: [1,2,3,4,5,15], 7: [3], 5: [3]}
```

## 5. CleanUp

Run the cleanup script to remove the .env file and to stop the blockchain.

```
./cleanup
```

## 6. Extras

We can obtain the block gas limit by running the following command.

```
npm run logBlockGasLimit
```

Use the following Equation to verifiy that the block gas limit does not influence the result.

gasLimit ( B<sub>i</sub> ) ≥ b · (#T/s) · gas<sub>T <sub>i</sub></sub>
