import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import * as React from "react";

import TableComp from "./activitytable";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import LaunchIcon from "@mui/icons-material/Launch";
import PeopleIcon from "@mui/icons-material/People";
import StarsIcon from "@mui/icons-material/Stars";
import WalletIcon from "@mui/icons-material/Wallet";
import WhatshotIcon from "@mui/icons-material/Whatshot";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useScoreCard } from "../hooks/useScoreCard";
import { CardMedia } from "@mui/material";

import UpcomingMatch1 from "../images/upc01.jpg";
import UpcomingMatch2 from "../images/upc02.jpg";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function DashboardComp() {
  const scoreCard = useScoreCard();

  return (
    <Box
      sx={{
        st: 1,
        padding: 2,
        width: 630,
      }}
    >
      <Typography
        variant="h5"
        color="black"
        fontFamily="Segoe UI Symbol"
        sx={{ mb: 5 }}
      >
        DASHBOARD
      </Typography>
      <Stack direction="row" spacing={2}>
        <Card
          sx={{
            maxWidth: 345,
            height: 200,
            width: 200,
            backgroundColor: "#D1EFEC",
            "&:hover": { backgroundColor: "#DBDBDB" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CardContent
            sx={{
              borderColor: "primary.main",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <DirectionsRunIcon
              fontSize="large"
              sx={{ color: "#197363", mb: 1 }}
              color="primary"
              align="centre"
            />
            <Typography variant="h4" sx={{ color: "black" }}>
              {scoreCard.runs}
            </Typography>
            <Typography variant="body2" sx={{ color: "black" }}>
              RUNS
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            maxWidth: 345,
            height: 200,
            width: 200,
            backgroundColor: "#F2D6F6",
            "&:hover": { backgroundColor: "#DBDBDB" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CardContent
            sx={{
              borderColor: "primary.main",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <StarsIcon
              fontSize="large"
              sx={{ color: "#D072DF", mb: 1 }}
              color="primary"
              align="centre"
            />
            <Typography align="centre" variant="h4" sx={{ color: "black" }}>
              {scoreCard.points}
            </Typography>
            <Typography variant="body2" sx={{ color: "black" }}>
              PTS
            </Typography>
          </CardContent>
        </Card>
        <Card
          sx={{
            maxWidth: 345,
            height: 200,
            width: 200,
            backgroundColor: "#F6DADE",
            "&:hover": { backgroundColor: "#DBDBDB" },
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <CardContent
            sx={{
              borderColor: "primary.main",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WhatshotIcon
              fontSize="large"
              sx={{ color: "#E86C60", mb: 1 }}
              color="primary"
              align="centre"
            />
            <Typography variant="h4" sx={{ color: "black" }}>
              {scoreCard.streak}
            </Typography>
            <Typography variant="body2" sx={{ color: "black" }}>
              STREAK
            </Typography>
          </CardContent> */}
        </Card>
      </Stack>
      <Stack direction="row" sx={{ mt: 5 }} spacing={2}>
        <Card
          sx={{
            maxWidth: 800,
            height: 200,
            width: 8000,
            backgroundColor: "#D5E7F7",
            "&:hover": { backgroundColor: "#DBDBDB" },
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <CardContent
            sx={{
              borderColor: "primary.main",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button
              variant="text"
              sx={{ width: 3, top: 0, right: 0, position: "absolute" }}
              href=""
            >
              <LaunchIcon
                fontSize="small"
                sx={{
                  color: "#5865F2",
                }}
                color="primary"
                align="centre"
              />
            </Button>
            <Stack direction="row" spacing={1}>
              {/* <PeopleIcon
                fontSize="large"
                sx={{ color: "#5865F2", mt: 1 }}
                color="primary"
                align="centre"
              /> */}
              <Typography variant="h4" sx={{ color: "black", pt: 0.7 }}>
                
              </Typography>
              <Typography variant="body2" sx={{ color: "black", pt: 2.4 }}>
                
              </Typography>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Typography variant="body2" sx={{ color: "black" }}>
                ONE STOP SOLUTION FOR THE FRAUDS IN FOOD CHAIN SUPPLY
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <Stack direction="row" sx={{ mt: 5 }} spacing={2}>
        <TableComp />
        <Card
          sx={{
            maxWidth: 345,
            height: 320,
            width: 295,
            backgroundColor: "white",
            "&:hover": { backgroundColor: "#DBDBDB" },
            // display: "flex",
            // justifyContent: "center",
          }}
        >
          <Stack direction="column" spacing={2}>
            <CardContent
            sx={{
              borderColor: "primary.main",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
          </CardContent>
          
            {/* <CardMedia component="img" image={UpcomingMatch1} height="80"/>
            <CardMedia component="img" image={UpcomingMatch2} height="80"/> */}
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}
