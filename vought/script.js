const fs = require("fs");
const leaderboard = require("./data.json").leaderboard;

const el = { runs: 25, address: "0x3" };

const calculateLeaderboard = (el) => {
  if (leaderboard.length === 0) {
    leaderboard.push(el);
    return;
  }

  const index = leaderboard.findIndex((pos) => pos.address === el.address);

  if (index != -1) {
    el.runs += leaderboard[index].runs;
    leaderboard.splice(index, 1);
  }

  const insertIndex = leaderboard.findIndex((pos) => pos.runs <= el.runs);
  if (insertIndex === -1) leaderboard.push(el);
  else leaderboard.splice(insertIndex, 0, el);
};

calculateLeaderboard(el);

fs.writeFile(
  "data.json",
  JSON.stringify({ leaderboard: leaderboard }),
  (error) => {
    if (error) throw error;
  }
);
