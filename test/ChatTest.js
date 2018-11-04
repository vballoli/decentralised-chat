var ChatRoom = artifacts.require("./ChatRoom.sol")

contract('ChatRoom', function(accounts) {

  var chatInstance;
  var sender1 = accounts[0];
  var sender2 = accounts[1];
  var message1 = "Hello!";
  var message2 = "Hey?";

  it("Initializing ...", function() {
    return ChatRoom.deployed().then(function(instance) {
      chatInstance = instance
      return chatInstance.getTotalNumberOfMessages();
    }).then(function(data) {
      console.log("Number of initialized");
      console.log("data");
      console.log(data.toNumber());
      assert.equal(data, 0, "number of messages should be initialized as 0");
      return chatInstance.getMessages();
    }).then(function(data) {
      console.log("Total number should be ");
      console.log(data);
      assert.equal(data.length, 0, "number of messages should be 0");
    });
  });

  it("Sending 3 messages", function() {
        return ChatRoom.deployed().then(function(instance) {
             instance.send_message("Hello");
             instance.send_message("Hey");
             instance.send_message("What's up?");
      });
 })

  it("Checking messages", function() {
    return ChatRoom.deployed().then(function(instance) {
      return instance.getTotalNumberOfMessages();
    }).then(function(data) {
      console.log("Data ..");
      console.log(data)
      return chatInstance.getMessages();
    }).then(function(data) {
      console.log("Messages ");
      console.log(data);
      return chatInstance.messages(data[2].toNumber());
    }).then(function(data) {
      console.log("Printing them");
      console.log(data);
    });
  });

})
