import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CricketerImg from "../images/photo.jpg";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { ethers } from "ethers";
import { calculateLeaderboard } from '../utils/Leaderboard.util'

import {
  abi as SeamlessAbi,
  contract as contractAddress,
} from "../SeamlessContractData";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import Snack from "./Snackbar";
import { green } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useScoreCard } from "../hooks/useScoreCard";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default function ICCAwards() {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const { address, web3Provider } = useWeb3AuthContext();
  const signer = web3Provider.getSigner(address);
  const score = useScoreCard(address)
  const buttonSx = {
    ...(isSuccess && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
      "&:disabled": {
        bgcolor: green[700],
        color: "#ddd",
      },
    }),
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleCloseInfo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setInfoOpen(false);
  };


  const vote = async () => {
    const contract = new ethers.Contract(contractAddress, SeamlessAbi, signer);
    if (!isLoading) {
      setIsSuccess(false);
      setIsLoading(true);
      const activityTxn = await contract.performActivity(
        address,
        "Voted in ICC awards",
        10,
        0
      );
      setInfoOpen(true);
      calculateLeaderboard({ runs: 10, address: `${address}` })
      activityTxn.wait().then(async (receipt) => {
        setIsLoading(false);
        console.log("Receipt: ", receipt);
        if (receipt.status === 1) {
          setIsSuccess(true);
          setOpen(true);
        }
      });
    }
  };

  return (
    // <div>
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
        ICC AWARDS
      </Typography>
      <Card sx={{ width: 250 }}>
        <CardMedia
          component="img"
          height="200"
          image={CricketerImg}
          alt="cricketer"
          sx={{ mr: 2 }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="p"
            component="div"
            sx={{ my: 0, mb: 2 }}
          >
            Shubman Gill
          </Typography>
          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              sx={{ ml: 1 }}
              onClick={vote}
              sx={buttonSx}
              disabled={isLoading || isSuccess}
            >
              <Typography
                gutterBottom
                variant="p"
                component="div"
                sx={{ my: 0, mb: 0 }}
              >
                Vote for +10 Runs
              </Typography>
            </Button>
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: green[500],
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </CardContent>
      </Card>
      <Snack
        open={open}
        handleClose={handleClose}
        text={`You got +${10} runs for voting in ICC Awards!`}
        type="success"
      />
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={isLoading && infoOpen}
        autoHideDuration={10000}
        onClose={handleCloseInfo}
      >
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          Thank you for voting in ICC awards, awarding you +10 Runs!
        </Alert>
      </Snackbar>
      </Box>
    //</Box></div>
  );
}
