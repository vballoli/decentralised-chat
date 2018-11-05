# Decentralised Chat

BITS F463 Cryptography Course Term Project.

# Build instructions

1. Install truffle, Web3, ganache, solc.

`npm install solc truffle Web3` (necessary)
`npm install ganache-cli`(optional)
`MetaMask` chrome extension

or

Download the ganache app.

`truffle unbox pet-shop`

Run ganache, set port number and change the port number in truffle.js file.

or

Clone this project and run `npm install`.

# Run

1. If first time, `truffle migrate` or else `truffle migrate --reset`

2. `npm run dev` - opens `localhost:3000` by default.

3. Run Ganache app and Login through MetaMask.

This loads a basic chat app, where each message sent from an account that is provided and authorised by MetaMask.
