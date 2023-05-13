import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import MatchImg1 from "../images/match1.webp";
import MatchImg2 from "../images/match2.jpeg";
import MatchCard from "./MatchCard";
import Grow from '@mui/material/Grow';

export default function BuyTicketsComp() {
  const matches = [
    {
      id: 0,
      name: "AUS vs IND",
      generalScore: { price: 0.001, runs: 15, points: 5 },
      vipScore: { price: 0.003, runs: 25, points: 10 },
      date: "6 June 2023",
      startTime: "17:00 hours",
      venue: "Adelaide Oval",
      matchType: "ODI",
      image: MatchImg1,
    },
    {
      id: 1,
      name: "IND vs PAK",
      generalScore: { price: 0.002, runs: 20, points: 10 },
      vipScore: { price: 0.004, runs: 35, points: 15 },
      date: "10 June 2023",
      startTime: "18:00 hours",
      matchType: "T20",
      venue: "Rajiv Gandhi",
      image: MatchImg2,
    },
  ];

  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked((prev) => !prev);
  }, []);

  return (
    <div>
      <Box
        sx={{
          st: 1,
          padding: 2,
          width: 800,
          height: 500,
        }}
      >
        <Typography
          variant="h5"
          color="black"
          fontFamily="Segoe UI Symbol"
          sx={{ mb: 5 }}
        >
          BUY TICKETS
        </Typography>
        <Grow in={checked} style={{ transformOrigin: '1 1 1' }} {...(checked ? { timeout: 1000 } : {})}>
        <Stack direction="row" spacing={7}>
          {matches.map((match) => (
            <MatchCard key={match.id} {...match} />
          ))}
        </Stack>
        </Grow>
      </Box>
    </div>
  );
}
