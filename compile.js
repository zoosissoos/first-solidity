const path = require('path');
const fs = require('fs');
const solc = require('solc');

//takes contacts file and reads file
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

//exports compiled contract
module.exports = solc.compile(source, 1).contracts[':Inbox'];

