require("dotenv").config();

import { HardhatUserConfig } from "hardhat/config";

import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";

const mochaConfig = {
  grep: "@forked-mainnet",
  invert: false,
  timeout: 40000,
} as Mocha.MochaOptions;


const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.6.10",
        settings: { optimizer: { enabled: true, runs: 200 } },
      },
      {
        version: "0.8.11",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
      gas: 12000000,
      blockGasLimit: 12000000
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      timeout: 200000,
      gas: 12000000,
      blockGasLimit: 12000000
    },
  },
  // @ts-ignore
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
    externalArtifacts: ["external/**/*.json"],
  },

  mocha: mochaConfig,

  // These are external artifacts we don't compile but would like to improve
  // test performance for by hardcoding the gas into the abi at runtime
  // @ts-ignore
  externalGasMods: [
    "external/abi/perp",
  ],
};

export default config;
