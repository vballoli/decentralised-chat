var ChatRoom = artifacts.require("./ChatRoom.sol");

module.exports = function(deployer) {
  deployer.deploy(ChatRoom);
};
