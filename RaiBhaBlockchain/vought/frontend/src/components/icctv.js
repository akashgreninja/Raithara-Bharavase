import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import CricketMatch from "../images/match3.png";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { calculateLeaderboard } from '../utils/Leaderboard.util'
import { ethers } from "ethers";
import {
  abi as SeamlessAbi,
  contract as contractAddress,
} from "../SeamlessContractData";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import Snack from "./Snackbar";
import { useScoreCard } from "../hooks/useScoreCard";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ICCTVComp() {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const runsAwarded = 10;
  const { address, web3Provider } = useWeb3AuthContext();
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

  const signer = web3Provider.getSigner(address);
  const watchTime = async () => {
    const contract = new ethers.Contract(contractAddress, SeamlessAbi, signer);
    if (!isLoading) {
      setIsSuccess(false);
      setIsLoading(true);
      const activityTxn = await contract.performActivity(
        address,
        "Watched ICC TV for 15 minutes",
        runsAwarded,
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
    //<div>
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
          FOOD CHAIN SUPPLY TRANSACTIONS
    </Typography>
        <Stack direction="row" spacing={5}>
          <Card sx={{ width: 920 }}>
            <CardMedia
              component="img"
              height="400"
              image={CricketMatch}
              alt="video"
            />
            <CardContent>
              <Stack direction="row" spacing={0.1}>
                <Box sx={{ m: 0.1, position: "relative" }}>
                  <Button
                    variant="contained"
                    disabled={isLoading || isSuccess}
                    onClick={watchTime}
                    sx={buttonSx}
                  >
                    To Do Transactions
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
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      
      <Snack
        open={open}
        handleClose={handleClose}
        text={`You got +${runsAwarded} runs for watching ICC TV!`}
        type="success"
      />
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={isLoading && infoOpen}
        autoHideDuration={10000}
        onClose={handleCloseInfo}
      >
        <Alert onClose={handleCloseInfo} severity="info" sx={{ width: "100%" }}>
          Your watchtime has increased, awarding you +{runsAwarded} Runs!
        </Alert>
      </Snackbar>
      </Box>
    //</div>
  );
}
