pragma solidity ^0.4.24;

contract ChatRoom {

    struct Message {
        uint id;
        address sender;
        string content;
        uint timestamp;
    }

    mapping (uint => Message) public messages;

    uint public messagesCount;

    event newMessageEvent(uint indexed _id, address indexed _sender, string _content);

    function send_message(string _content) public {

        messages[messagesCount] =  Message(
                messagesCount, msg.sender, _content, now
            );

        messagesCount++;

        emit newMessageEvent(messagesCount, msg.sender, _content);
    }

    function getMessages() public constant returns (uint []){
        if (messagesCount == 0) {
            return new uint[](0);
        }

        uint[] memory messageIds = new uint[](messagesCount);

        for(uint i = 0; i< messagesCount; i++) {
            messageIds[i] = messages[i].id;
        }

        return messageIds;
    }

    function getTotalNumberOfMessages() public constant returns (uint) {
        return messagesCount;
    }

    constructor () public {
        messagesCount = 0;
    }

}
