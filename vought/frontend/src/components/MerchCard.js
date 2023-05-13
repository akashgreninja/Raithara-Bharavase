import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import { green } from "@mui/material/colors";

import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import { ethers } from "ethers";
import {
  abi as SeamlessAbi,
  contract as SeamlessAddress,
} from "../SeamlessContractData";
import Snack from "./Snackbar";
import { calculateLeaderboard } from "../utils/Leaderboard.util";

export default function MerchCard({ name, color, price, runsAwarded, image }) {
  const [snackopen, setSnackOpen] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);


  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickway") {
      return;
    }

    setSnackOpen(false);
  };
  const handleCloseInfo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setInfoOpen(false);
  };

  const { address, web3Provider } = useWeb3AuthContext();
  const signer = web3Provider.getSigner(address);

  const buy = async () => {
    setIsSuccess(false);
    setIsLoading(true);
    const contract = new ethers.Contract(SeamlessAddress, SeamlessAbi, signer);
    const redeemPointsTxn = await contract.redeemPoints(address, price, runsAwarded, name);
    setInfoOpen(true);
    redeemPointsTxn.wait().then(async (receipt) => {
      setIsLoading(false);
      if (receipt.status === 1) {
        setIsSuccess(true);
        setOpen(true);
      }
    })
    calculateLeaderboard({ runs: runsAwarded, address: `${address}` })
    setSnackOpen(true);
  };

  return (
    <>
      <Card sx={{ width: 340, height: 480 }}>
        {isLoading && <CircularProgress />}
        <CardMedia component="img" height="300" image={image} alt="match1" />
        <CardContent>
          <Stack
            direction="column"
            spacing={1}
            divider={<Divider orientation="horizontal" flexItem />}
          >
            <Typography
              gutterBottom
              variant="p"
              component="div"
              sx={{ mt: 1.4 }}
            >
              {name} in Color: {color}
            </Typography>

            <Stack direction="row" spacing={3}>
              <Typography sx={{ fontSize: 14 }}>Cost: {price} Pts</Typography>
              <Typography sx={{ fontSize: 14 }}>
                Runs Awarded: +{runsAwarded} Runs
              </Typography>
            </Stack>
            <Button variant="contained" onClick={buy} sx={{ my: 20 }}>
              BUY MERCH
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Snack
        text={`You bought ${name}. You got +${runsAwarded} runs for buying merch!`}
        open={isSuccess}
        handleClose={handleSnackClose}
        type="success"
      />
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={isLoading && infoOpen}
        autoHideDuration={10000}
        onClose={handleCloseInfo}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Thank you for redeeming points! Awarding you runs!
        </Alert>
      </Snackbar>
    </>
  );
}
