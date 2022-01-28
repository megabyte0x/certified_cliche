//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    //auto-increment field for each tokem
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    //address of the NFT market place
    address contractAddress;

    constructor(address marketplaceAddress)
        ERC721("Certified-Cliche", "CC") // Name of the Token and it's symbol.
    {
        contractAddress = marketplaceAddress;
    }

    /// @notice creates a new token
    /// @param tokenURI: token URI
    function createToken(string memory tokenURI) public returns (uint256) {
        //set a new tokenId for the token to be minted
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _mint(msg.sender, newItemId); //mint the token
        _setTokenURI(newItemId, tokenURI); //generate the URI
        setApprovalForAll(contractAddress, true); //grant transaction permission to market

        //returns tokenID
        return newItemId;
    }
}
