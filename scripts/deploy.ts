import { ethers, hardhatArguments } from 'hardhat';
import * as Config from './config';

async function main() {
   await Config.initConfig();
   const network = hardhatArguments.network ?? 'dev';
   const [deployer] = await ethers.getSigners();
   console.log('deploy from address: ', deployer.address);

   const LuckToken = await ethers.getContractFactory("LuckToken");
   const luckToken = await LuckToken.deploy();
   console.log("LuckToken address: ", luckToken.address);
   Config.setConfig(network + '.LuckToken', luckToken.address);

   await Config.updateConfig()
}

main()
   .then(() => process.exit(0))
   .catch(error => {
      console.log(error);
      process.exit(1)
   })