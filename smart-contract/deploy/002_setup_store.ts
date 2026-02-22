import type { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async ({ midl }) => {
  console.log("Setting up product...");

  await midl.initialize();

  // productId = 1
  // price = 10000 sats
  await midl.write("Store", "addProduct", [1, 10000n]);

  await midl.execute();

  console.log("Product added!");
};

deploy.tags = ["setup"];

export default deploy;