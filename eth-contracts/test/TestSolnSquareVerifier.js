let SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
let squareProof = require('../../zokrates/code/square/proof.json');


contract('TestSolnSquareVerifier', accounts => {
    const account_one = accounts[0];
    beforeEach( async function() {
        this.contract = await SolnSquareVerifier.new({from: account_one});
    })

    it('Test if a new solution can be added for contract - SolnSquareVerifier', async function () {
        let output = await this.contract.addSolutionArray(account_one, 1, squareProof.proof.a, squareProof.proof.b, squareProof.proof.c, squareProof.inputs, {from: account_one});
        assert.equal(output.logs[0].event, 'addedSolution', 'Solution was not added');
    })

    it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async function() {
        let tokenMint;
        try {
            await this.contract.addSolutionArray(account_one, 1, squareProof.proof.a, squareProof.proof.b, squareProof.proof.c, squareProof.inputs, {from: account_one});
            await this.contract.mintTheNft(account_one, 1, {from: account_one});
            tokenMint = true;
        } catch (error) {
            console.log(error);
            tokenMint = false;
        }
        assert.equal(tokenMint, true, "Token could not be minted");
    })
})

