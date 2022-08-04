pragma solidity >=0.4.21 <0.6.0;

import "./Oraclize.sol";
import "./ERC721Mintable.sol";
import "./Verifier.sol";


//// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
//contract SquareVerifier is Verifier {
//
//}

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is Verifier, CustomERC721Token {

    constructor() public {
        solutionStruct.push(Solution(0, address(0), false));
    }

    // TODO define a solutions struct that can hold an index & an address
    struct Solution {
          uint256 _index;
          address _address;
           bool _isMint;
     }

    // TODO define an array of the above struct
    Solution[] solutionStruct;

    // TODO define a mapping to store unique solutions submitted
    mapping(bytes32 => bool) public uniqueSolution;

//Modifier
  modifier onlyOwner(){
        require(msg.sender == _owner,"Not owner of the contract");
        _;
    }


    // TODO Create an event to emit when a solution is added
    event addedSolution(uint256 index, address _address);

    // TODO Create a function to add the solutions to the array and emit the event
    function addSolutionArray(address _address, uint256 _index, uint[2] memory a, uint[2][2] memory b, uint[2] memory c, uint[2] memory input) public {
        bytes32 key = keccak256(abi.encodePacked(a, b, c, input));
        require(uniqueSolution[key] == false, "Not a unique solution");
        bool txVerifyTrue = verifyTx(a, b, c, input);
        require(txVerifyTrue, "solutions could not be verified");
         Solution memory solution = Solution(_index, _address, false);
         solutionStruct.push(solution);
         uniqueSolution[key] = true;
         emit addedSolution(_index, _address);
    }

    // TODO Create a function to mint new NFT only after the solution has been verified
    //  - make sure the solution is unique (has not been used before)
    //  - make sure you handle metadata as well as tokenSupply
    function mintTheNft( address _address, uint256 tokenId ) public onlyOwner returns(bool) {
        require(solutionStruct[tokenId]._address == _address, "Provided Address does not match the solution address");
        require(solutionStruct[tokenId]._isMint == false, "Token has been minted");
         solutionStruct[tokenId]._isMint = true;
         super.mint(_address, tokenId);
         return true;
    }

}

  

























