var CustomERC721Token = artifacts.require('CustomERC721Token');

contract('CustomERC721Token', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new({from: account_one});

            // TODO: mint multiple tokens
                 // TODO: mint multiple tokens
                 await this.contract.mint(account_one, 0)
                 await this.contract.mint(account_one, 1)
                 await this.contract.mint(account_one, 2)
                 await this.contract.mint(account_one, 3)

        })

        it('should return total supply', async function () { 
         let totalSupply = await this.contract.totalSupply()
            return totalSupply
            
        })

        it('should get token balance', async function () { 
            let tokenBalance = await this.contract.balanceOf(account_one)
            return tokenBalance
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let tokenURI = await this.contract.tokenURI(0)
             return tokenURI
            
        })

        it('should transfer token from one owner to another', async function () { 
            let firstOwner = await this.contract.ownerOf(0)
            await this.contract.transferFrom(account_one, account_two, 0)
            let secondOwner = await this.contract.ownerOf(0)
            
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            //Test needs refactoring
            let mintFail = false;
            try {
                await this.contract.mint(account_two, 1, {from: account_two});
            } catch (error) {
                mintFail = true;
            }
            assert.equal(mintFail, true, "Was able to mint a coin as non contract owner");
            
        })

        it('should return contract owner', async function () { 
            let firstOwner = this.contract.retrieveCurrentOwner.call();
            assert.equal(await firstOwner , account_one, "Contract owner not returned properly")
        })

    });
})