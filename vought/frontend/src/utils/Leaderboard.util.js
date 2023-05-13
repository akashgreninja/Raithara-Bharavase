

export const calculateLeaderboard = (el) => {
    let leaderboardArray = JSON.parse(window.localStorage.getItem('leaderboard'));
    const index = leaderboardArray.findIndex((pos) => pos.address === el.address);
    if (index !== -1) {
        el.runs += leaderboardArray[index].runs;
        leaderboardArray.splice(index, 1);
    }
    const insertIndex = leaderboardArray.findIndex((pos) => pos.runs <= el.runs);
    if (insertIndex === -1) leaderboardArray.push(el);
    else leaderboardArray.splice(insertIndex, 0, el);

    window.localStorage.setItem('leaderboard', JSON.stringify([...leaderboardArray]))
}