const Producers = artifacts.require("Producers");

module.exports = async function (deployer) {
  await deployer.deploy(Producers);
};