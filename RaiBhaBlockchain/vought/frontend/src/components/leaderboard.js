import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

// import { personas } from "@dicebear/collection";
// import { createAvatar } from "@dicebear/core";
import Stack from "@mui/material/Stack";
import { useScoreCard } from "../hooks/useScoreCard";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import LeagueBronze from "../images/bronze_medal.webp";
import LeagueGold from "../images/gold_medal.png";
import LeagueSilver from "../images/silver_medal.png";
import Rank1 from "../images/trophy.jpeg";
import Rank2 from "../images/trophy2.png";
import Rank3 from "../images/trophy3.png";
import { calculateLeaderboard } from "../utils/Leaderboard.util";

export default function LeaderboardComp() {
  const { address } = useWeb3AuthContext();
  const score = useScoreCard();

  const leaderboard = JSON.parse(window.localStorage.getItem('leaderboard'))
  const rankImages = [Rank1, Rank2, Rank3];
  const leagues = [
    { id: 0, name: "Bronze", image: LeagueBronze, threshold: 0 },
    { id: 1, name: "Silver", image: LeagueSilver, threshold: 100 },
    { id: 2, name: "Gold", image: LeagueGold, threshold: 200 },
  ];


  const userLeague = leagues
    .filter((league) => league.threshold <= score.runs)
    .at(-1);

  const generateAvatar = (seed) => {
    // const avatar = createAvatar(personas, {
    //   seed,
    // });

    //return avatar.toDataUriSync();
  };

  return (
    <Box
      sx={{
        st: 1,
        padding: 2,
      }}
    >
      <Typography
        variant="h5"
        color="black"
        fontFamily="Segoe UI Symbol"
        sx={{ mb: 5 }}
      >
        STATUS INFORMATION
      </Typography>

      <Stack direction="column" spacing={2}>
        <Card
          sx={{
            maxWidth: 705,
            width: 600,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardMedia
            sx={{ width: 100, m: 1 }}
            component="img"
            height="100"
            image={userLeague.image}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
           >
          {/* //   <Typography gutterBottom variant="h6" component="div">
          //     {userLeague.name} League
          //   </Typography> */}
            <Stack direction="row" spacing={1}>
              <Typography variant="body2" color="text.secondary">
                
              </Typography>
              <Typography variant="body2" color="#3CB371">
                FOOD CHAIN SUPPLY TRANSACTIONS
              </Typography>
            </Stack>
          </CardContent>
        </Card>
        {leaderboard.map((rank, index) => (
          <Card
            elevation={0}
            key={rank.address}
            sx={{
              border: rank.address === address ? "1px solid green" : "",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {index < 3 ? (
                <img src={rankImages[index]} width={30} alt="" />
              ) : (
                <p>{index + 1}</p>
              )}
              <img
                src={`${generateAvatar(rank.address)}`}
                width={40}
                alt=""
                style={{ marginTop: "-10px" }}
              />
              <Typography variant="p" color="black">
                {rank.address}
              </Typography>
              {/* <Typography variant="p" color="#DF0000">
                {rank.runs} Runs
              </Typography> */}
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
}
