import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { calculateLeaderboard } from '../utils/Leaderboard.util'

import * as React from "react";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import { ethers } from "ethers";
import {
  abi as MatchTicketAbi,
  contract as contractAddress,
} from "../MatchTicketData";
import Snack from "./Snackbar";
import { TextField } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TicketModal({
  id,
  name,
  open,
  handleClose,
  generalScore,
  vipScore,
  startTime,
  venue,
  date,
  matchType,
}) {
  const [radio, setRadio] = React.useState("GEN");
  const [seatId, setSeatId] = React.useState("A1");
  const [runs, setRuns] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const [snackopen, setSnackOpen] = React.useState(false);

  const buttonSx = {
    mx: 20,
    mt: 2,
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

  const handleCloseInfo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setInfoOpen(false);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackOpen(false);
  };

  const { address, web3Provider } = useWeb3AuthContext();
  const signer = web3Provider.getSigner(address);
  const buy = async (e) => {
    if (!isLoading) {
      setIsSuccess(false);
      setIsLoading(true);
      e.preventDefault();
      let price = 0;
      let runs = 0;
      let points = 0;
      if (radio === "GEN") {
        price = generalScore.price;
        runs = generalScore.runs;
        points = generalScore.points;
      } else {
        price = vipScore.price;
        runs = vipScore.runs;
        points = vipScore.points;
      }
      setRuns(runs);
      const contract = new ethers.Contract(
        contractAddress,
        MatchTicketAbi,
        signer
      );
      const nftTxn = await contract.safeMint(
        address,
        seatId,
        id,
        ethers.utils.parseEther(`${price}`),
        runs,
        points,
        name,
        venue,
        date,
        matchType,
        {
          value: ethers.utils.parseEther(`${price}`),
        }
      );
      setInfoOpen(true);
      calculateLeaderboard({ runs: runs, address: `${address}` })

      nftTxn.wait().then(async (receipt) => {
        setIsLoading(false);
        if (receipt.status === 1) {
          setIsSuccess(true);
          setSnackOpen(true);
        }
      });
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 450,
            bgcolor: "background.paper",
            border: "0px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            alignContent="center"
            sx={{ mx: 20 }}
          >
            Ticket Details
          </Typography>
          <Stack direction="column" spacing={0.5}>
            <Stack direction="row" spacing={0.5} sx={{ mt: 2, mx: 1 }}>
              <Chip label={date} variant="outlined" size="medium" />
              <Chip label={startTime} variant="outlined" size="medium" />
              <Chip label={venue} variant="outlined" size="medium" />
              <Chip label={matchType} variant="outlined" size="medium" />
            </Stack>
          </Stack>

          <form>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                size="small"
                sx={{ mt: 2 }}
                value={radio}
                onChange={(e) => setRadio(e.target.value)}
              >
                <FormControlLabel
                  value="GEN"
                  control={<Radio />}
                  label={`GEN :: ${generalScore.price} eth :: +${generalScore.points} Pts  +${generalScore.runs} Runs`}
                />
                <FormControlLabel
                  value="VIP"
                  control={<Radio />}
                  label={`VIP :: ${vipScore.price} eth :: +${vipScore.points} Pts  +${vipScore.runs} Runs`}
                />
              </RadioGroup>

              <TextField
                placeholder="Seat number"
                value={seatId}
                onChange={(e) => setSeatId(e.target.value)}
                required="true"
              />
              <Box sx={{ m: 0.1, position: "relative" }}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isLoading || isSuccess}
                  onClick={buy}
                  sx={buttonSx}
                >
                  Buy Ticket
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: green[500],
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      marginTop: "-5px",
                      marginLeft: "-12px",
                    }}
                  />
                )}
              </Box>
            </FormControl>
          </form>
        </Box>
      </Modal>
      <Snack
        text={`Ticket bought for ${name}. You got +${runs} runs for buying ticket!`}
        open={snackopen}
        handleClose={handleSnackClose}
        type="success"
      />
      <Snackbar
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        open={isLoading && infoOpen}
        autoHideDuration={10000}
        onClose={handleCloseInfo}
      >
        <Alert onClose={handleCloseInfo} severity="info" sx={{ width: "100%" }}>
          Minting your ticket, awarding you {runs} Runs!
        </Alert>
      </Snackbar>
    </>
  );
}
