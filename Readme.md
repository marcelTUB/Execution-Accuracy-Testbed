# Intro

This project is the implementation part of the short paper

<b> Can We Effectively Use Smart Contracts to Stipulate Time Constraints?</b>

and provides the code needed to reproduce the result described in the paper.

Upon the setup, a time-sensitive smart contract is deployed on a locally running blockchain or on one of the Ethereum test networks, depending on the users input. The experiment script sends multiple transactions to the blockchain to request the computation of a temporal constrained function defined in the smart contract. The generated output file contains the result of one experiment execeution. A Jupyter Notebook is used to read the output files and visualize the result. 

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

4. install the packages

```
npm install
```

List of dependencies

- node, tested with version v16.13.0
- npm, tested with version 7.19.1
- Docker, tested with version 1.29.2, build 5becea4c
- Docker-Compose, tested with 20.10.8, build 3967b7d



## 2. Setup

1. Start the setup script by running following command in the project root direcotry.

```
./setup.sh
```
Follow the instructions prompted in the console.

A .env file is generated in the root directory.

```
npm start
```

The script generates an output file that contains the data from one execution. The file is saved in /generatedData. The filename is the UTC in seconds. The experiment will restart automatically. If you want to end the experiment you have to do it manually (CTRL+C).

## 4. Generate Evaluation Plots

In root directory double click on Evaluation.ipynb.
Juypter notebook should open automatically.
Change the configuration in the second block of the jupyter notebook to select the blockchain configuration you want to create plots for.

Note: The Jupyter notebook was tested with the following blockchain configuration. Some functions may not work properly if different configurations are used.

Schema {blocktime: [ recommitIntervals ]}

```py
configuration={6: [1,2,3,4,5,15], 7: [3], 5: [3]}
```
## 5. Other

Please cite the following paper if you use our code:

@inproceedings{10.1109/DAPPS55202.2022.00010,
  author = {Eichinger, Tobias and Ebermann, Marcel},
  title = {Can We Effectively Use Smart Contracts to Stipulate Time Constraints?},
  year = {2022},
  booktitle = {2022 IEEE International Conference on Decentralized Applications and Infrastructures},
  series = {DAPPS'22},
  pages = {11-18},
  doi = {10.1109/DAPPS55202.2022.00010},
}
