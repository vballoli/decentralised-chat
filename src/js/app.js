App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    console.log("Initialized");
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    console.log("Eth error");
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      console.log("Not undefined ");
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    App.displayAccountInfo();
    return App.initContract();
  },

  displayAccountInfo: function() {
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#account").text(account);
      }
      else if (err == null){
        ("#account").text("Not logged in");
      }
    });
  },

  initContract: function() {
    $.getJSON("ChatRoom.json", function(chatRoomArtifact) {
          // Instantiate a new truffle contract from the artifact
          App.contracts.ChatRoom = TruffleContract(chatRoomArtifact);
          // Connect provider to interact with contract
          App.contracts.ChatRoom.setProvider(App.web3Provider);

          App.reloadMessages();
          return App.render();
        });
  },

  sendMessage : function() {
    var _newMessage = $("#newMessageText").val();
    if (_newMessage.trim() == '') {
      return false;
    }

    App.contracts.ChatRoom.deployed().then(function(instance) {
      console.log("Message sending..");
      console.log(_newMessage);
      instance.send_message(_newMessage);
      App.render();
      App.reloadMessages();
      return instance.send_message(_newMessage);
    }).catch(function(err) {
      console.error(err);
    });
  },

  reloadMessages: function() {
    // avoid reentry
    if (App.loading) {
      return;
    }
    App.loading = true;

    var chatInstance;

    App.contracts.ChatRoom.deployed().then(function(instance) {
      chatInstance = instance;
      return chatInstance.getMessages();
    }).then(function(messageIds) {
      // Retrieve and clear the message placeholder
      var messageRow = $('#messageRow');
      messageRow.empty();
      for (var i = 0; i < messageIds.length; i++) {
        var messageId = messageIds[i];
        chatInstance.messages(messageId).then(function(message) {
          console.log("Messages displaying ....");
          console.log(message[0]);
          App.displayMessage(
            message[0],
            message[1],
            message[2]
          );
        });
      }
      $('#messageTemplate').show();
      App.loading = false;
    }).catch(function(err) {
      console.log(err.message);
      App.loading = false;
    });
  },

  displayMessage: function(id, sender, message) {
    // Retrieve the message placeholder
    var messageRow = $('#messageRow');

    // Retrieve and fill the message template
    var messageTemplate = $('#messageTemplate');
    messageTemplate.find('.msg-text').text(message);
    messageTemplate.find('.msg-sender').text(sender);

    //Add the message to the row
    messageRow.append(messageTemplate.html());
  },

  render: function() {
    var chatInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
        loader.hide();
        content.show();
      } else {
        $("#accountAddress").html("Your Account: Error");
        content.show();
      }
    });

    App.contracts.ChatRoom.deployed().then(function(instance) {
      chatInstance = instance;
      return chatInstance.getTotalNumberOfMessages();
    }).then(function(data) {
      console.log("Data");
      console.log(data);
      console.log("Data log");
      console.log(data.toNumber());
      $("#messageCount").html(data.toNumber());
      return chatInstance.getMessages();
    }).then(function(data) {
      console.log("Messages data");
      console.log(data);
    })

}
};

$(function() {
  $(window).load(function() {
    console.log("Inited");
    App.init();
  });
});
