// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./1_Seamless.sol";

import "hardhat/console.sol";

contract MatchTicket is ERC721, ERC721Enumerable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    Seamless private seamless;

    struct Ticket {
        string seat;
        uint matchId;
        bool checkedIn;
        string matchName;
        string venue;
        string date;
        string matchType;
    }

    event StadiumCheckin(address user, uint matchid, string seat);
    event BuyTicket(address user, string seat, uint matchId, string matchName, string venue, string date, string matchType);

    mapping(uint => Ticket) public tokenData;

    constructor(Seamless _seamless) ERC721("MatchTicket", "ICC") {
        seamless = _seamless;
    }

    function changeSeamless(Seamless _seamless) external onlyOwner {
        seamless = _seamless;
    }

    function safeMint(address to, string memory seat, uint matchId, uint price, uint runs, int points, string memory matchName, string memory venue, string memory date, string memory matchType) external payable {
        require(msg.value >= price, "Not enough funds provided to buy the ticket");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        tokenData[tokenId] = Ticket(seat, matchId, false, matchName, venue, date, matchType);
        seamless.performActivity(to, "Bought match ticket", runs, points);
        emit BuyTicket(to, seat, matchId, matchName, venue, date, matchType);
    }

    function areStringsEqual(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    function ticketCheckin(address user, string memory seat, uint matchId) external returns (bool) {
        uint numberOfNFTs = balanceOf(user);
        
        for(uint i = 0; i < numberOfNFTs; ++i) {
            uint tokenId = tokenOfOwnerByIndex(user, i);
            if(tokenData[tokenId].matchId == matchId && areStringsEqual(tokenData[tokenId].seat, seat)) {
                if(tokenData[tokenId].checkedIn == true) return true;
                tokenData[tokenId].checkedIn = true;
                seamless.performActivity(user, "Checked in to stadium", 25, 0);
                emit StadiumCheckin(user, matchId, seat);
                return true;
            }
        }
        return false;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
