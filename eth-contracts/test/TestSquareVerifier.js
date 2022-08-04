let Verifier = artifacts.require("Verifier");
let squareProof = require('../../zokrates/code/square/proof');

contract('TestSquareVerifier', accounts => {
    beforeEach('Testing SquareVerifier', async function () {
        this.contract = await Verifier.new({from: accounts[0]});
    })

    // Test verification with correct proof
    // - use the contents from proof.json generated from zokrates steps
    it('Test verification with correct proof', async function () {
        const verificationProof = await this.contract.verifyTx(squareProof.proof.a, squareProof.proof.b, squareProof.proof.c, squareProof.inputs);
        assert.equal(verificationProof, true, "Proof could not be verified");
    })

    it('Test verification with incorrect proof', async function () {
        const verificationProof  = await this.contract.verifyTx(squareProof.proof.c, squareProof.proof.b, squareProof.proof.a, squareProof.inputs);
        assert.equal( verificationProof , false, "Incorrect proof");
    })
})