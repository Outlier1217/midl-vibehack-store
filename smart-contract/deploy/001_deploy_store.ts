import type { DeployFunction } from "hardhat-deploy/types";

const deploy: DeployFunction = async ({ midl }) => {
  console.log("🚀 Starting Store deployment...");

  // VERY IMPORTANT
  await midl.initialize();

  console.log("Bitcoin Address:", midl.account.address);
  console.log("EVM Address:", midl.evm.address);

  // Deploy Store contract
  await midl.deploy("Store", []);

  // Execute (broadcast Bitcoin tx)
  await midl.execute();

  console.log("✅ Store deployed successfully!");
};

deploy.tags = ["store"];

export default deploy;