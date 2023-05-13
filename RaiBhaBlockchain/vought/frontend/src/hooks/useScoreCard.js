import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import {
  abi as SeamlessAbi,
  contract as SeamlessAddress,
} from "../SeamlessContractData";

export const useScoreCard = () => {
  const [runs, setRuns] = useState(0);
  const [streak, setStreak] = useState(0);
  const [points, setPoints] = useState(0);
  const [lastActivityDay, setLastActivityDay] = useState(0);
  const { address, web3Provider } = useWeb3AuthContext();
  const signer = web3Provider.getSigner();
  const contract = new ethers.Contract(SeamlessAddress, SeamlessAbi, signer);

  useEffect(() => {
    async function fetchScoreCard() {
      const scoreCard = await contract.scores(address);
      setPoints(parseInt(scoreCard.points));
      setRuns(parseInt(scoreCard.runs));
      setStreak(parseInt(scoreCard.streak));
      setLastActivityDay(parseInt(scoreCard.lastActivityDay));
      if (window.localStorage.getItem('leaderboard') === null) {
        window.localStorage.setItem('leaderboard', JSON.stringify([{ runs: parseInt(scoreCard.runs), address: `${address}` }]))
      }
    }
    fetchScoreCard();
  }, []);
  return { runs, streak, points, lastActivityDay };
};
