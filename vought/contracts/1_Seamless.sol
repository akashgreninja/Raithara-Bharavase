// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Seamless {
    address payable public owner;
    uint costPerPoint = 5 wei;

    struct ScoreCard {
        uint runs;
        uint streak;
        uint lastActivityDay;
        int points;
    }

    mapping(address => ScoreCard) public scores;

    event Activity(address user, string name, uint runs, int points);

    constructor() {
        owner = payable(msg.sender);
    }

    function awardScore(uint _runs, int _points, address _to) internal returns (ScoreCard memory) {
        scores[_to].runs += _runs;
        scores[_to].points += _points;

        uint currentDay = block.timestamp / 86400;
        uint difference = currentDay - scores[_to].lastActivityDay;
        if(difference == 1) scores[_to].streak++;
        else if(difference > 1) scores[_to].streak = 1;

        scores[_to].lastActivityDay = currentDay;
        return scores[_to];
    }

    function performActivity(address _user, string memory _activityName, uint _runs, int _points) public returns (ScoreCard memory) {
        emit Activity(_user, _activityName, _runs, _points);

        ScoreCard memory updatedScoreCard = awardScore(_runs, _points, _user);
        return updatedScoreCard;
    }

    function redeemPoints(address user, int points, uint runs, string memory item) external {
        require(scores[user].points >= points, "Not enough points");
        performActivity(user, item, runs, -points);
    }

    function buyPoints(int _points) external payable {
        require(costPerPoint * uint(_points) <= msg.value, "Not enough funds sent to buy points.");

        emit Activity(msg.sender, "Bought points", 0, _points);
        scores[msg.sender].points += _points;
    }
}
