import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { red } from "@mui/material/colors";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useScoreCard } from "../hooks/useScoreCard";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";

export default function ProfileCard() {
  const scoreCard = useScoreCard();
  const { address } = useWeb3AuthContext();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], width: 50, height: 50 }}
            aria-label="recipe"
          >
            <AccountCircleIcon />
          </Avatar>
        }
        title={
          address.substring(0, 5) +
          ".............." +
          address.substring(address.length - 4)
        }
      />
      <CardContent>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={6}>
            <Avatar
              sx={{ bgcolor: "#257B6B", width: 70, height: 70 }}
              aria-label="runs"
            >
              <Typography variant="h5" sx={{ color: "white" }}>
                {scoreCard.runs}
              </Typography>
            </Avatar>
            <Avatar
              sx={{ bgcolor: "#BD34D1", width: 70, height: 70 }}
              aria-label="points"
            >
              <Typography variant="h5" sx={{ color: "white" }}>
                {scoreCard.points}
              </Typography>
            </Avatar>
            <Avatar
              sx={{ bgcolor: "#E86C60", width: 70, height: 70 }}
              aria-label="runs"
            >
              <Typography variant="h5" sx={{ color: "white" }}>
                {scoreCard.streak}
              </Typography>
            </Avatar>
          </Stack>
          <Stack direction="row" spacing={7} sx={{ ml: 20 }}>
            <Typography variant="h5" sx={{ color: "black" }}>
              RUNS
            </Typography>
            <Typography variant="h5" sx={{ color: "black" }}>
              PTS
            </Typography>
            <Typography variant="h5" sx={{ color: "black" }}>
              STREAK
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
