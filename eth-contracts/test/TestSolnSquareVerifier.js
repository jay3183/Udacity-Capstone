let SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
let proof = {
    "proof": {
      "a": [
        "0x0a8949e6b8199d31d49eaf2ca56d1215f343f0e7db4be8e82da0225c3e5c94bc",
        "0x22ad053d7348aaeefde7471ccdea73c33aec3ed5bfb79e51c86f0fd2f05ef435"
      ],
      "b": [
        [
          "0x0706579d81733b07a444b85a9c1e1e991907a0122cf686fa3e2eb95c68629b1a",
          "0x0863fafc2a63944c64b60f6e4afa17fbe9912eb3dc13a4147b49b3efee2cf032"
        ],
        [
          "0x21ab930c35028128690b1c94e5f134606b5fa84c2ae994b26a5b760a3a6251fc",
          "0x258be13b875a905103698f663edc99ae4c2d0705983fd4fcce1151de031851a0"
        ]
      ],
      "c": [
        "0x1bd415a281f4f6e9b092948cad2349f9d62b4b292714d742345663bf746ccbe6",
        "0x2aca646850a07bc237029b40ffbc642868214a45a673e1d9bf8fd39c8df83fcc"
      ]
    },
    "inputs": [
      "0x0000000000000000000000000000000000000000000000000000000000000009",
      "0x0000000000000000000000000000000000000000000000000000000000000001"
    ]
  };

contract('TestSolnSquareVerifier', accounts => {
    const account_one = accounts[0];
    const account_two = accounts[1]
    beforeEach( async function() {
        this.contract = await SolnSquareVerifier.new({from: account_one});
    })

    it('Test if a new solution can be added for contract - SolnSquareVerifier', async function () {
        let output = await this.contract.addSolution(account_one, 1, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, {from: account_two});
        assert.equal(output.logs[0].event, 'SolutionAdded', 'Solution not added');
    })

    it('Test if an ERC721 token can be minted for contract - SolnSquareVerifier', async function( ) {
        let minted;
        try {
            await this.contract.addSolution(account_one, 1, proof.proof.a, proof.proof.b, proof.proof.c, proof.inputs, {from: account_one});
            await this.contract.mint(account_one, 1, {from: account_one});
            minted = true;
        } catch (error) {
            console.log(error);
            minted = false;
        }
        assert.equal(minted, true, "Could not mint token");
    })
})