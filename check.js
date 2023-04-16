const Web3 = require('web3');
const web3 = new Web3('HTTP://127.0.0.1:7545');

const fromAddress = '0x903101CdbDC94dEd74e49A5c9b54e13581e224dB';
const privateKey = '0xa0f309688f1e76c30cb36b251c27acb1ca824d1195e8b5d29673189c75f66bef';

web3.eth.getBalance ('0x903101CdbDC94dEd74e49A5c9b54e13581e224dB').then(function(wei){
    const ethBalance = web3.utils.fromWei(wei, 'ether');
    console.log(`Your current Balance is ${ethBalance}`);
})

const toAddress = '0xB8B48D56010f48E0068c3574fB96000b225fA163';

const sendTransaction = async () => {
    console.log(`Sending ETH from ${fromAddress} to ${toAddress}`)

    const createTransaction = await web3.eth.accounts.signTransaction({
        from: fromAddress,
        to: toAddress,
        value: web3.utils.toWei('20', 'ether'),
        gas: 40000,
    },
    privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
    console.log(`Transaction completed successfully with hash: ${receipt.transactionHash}`);
}


sendTransaction()