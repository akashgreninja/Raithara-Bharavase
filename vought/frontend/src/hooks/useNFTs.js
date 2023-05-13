import { useEffect, useState } from "react";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import {
  abi as TicketAbi,
  contract as ticketAddress,
} from "../MatchTicketData";
import { ethers } from "ethers";

export const useNFTs = () => {
  const [userNFTs, setUserNFTs] = useState([]);

  const { address, web3Provider } = useWeb3AuthContext();
  const signer = web3Provider.getSigner(address);

  const contract = new ethers.Contract(ticketAddress, TicketAbi, signer);

  useEffect(() => {
    async function fetchNFTs() {
      const nftCount = parseInt(await contract.balanceOf(address));
      for (let i = 0; i < nftCount; ++i) {
        const tokenId = parseInt(
          await contract.tokenOfOwnerByIndex(address, i)
        );
        const tokenData = await contract.tokenData(tokenId);
        setUserNFTs((old) => [...old, tokenData]);
      }
    }
    fetchNFTs();
  }, []);
  return { userNFTs };
};
