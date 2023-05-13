import { Button, FormControl } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import * as React from "react";
import { green } from "@mui/material/colors";
import { ethers } from "ethers";
import {
  abi as SeamlessAbi,
  contract as contractAddress,
} from "../SeamlessContractData";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import Snack from "./Snackbar";
import { calculateLeaderboard } from "../utils/Leaderboard.util";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Quiz() {
  const [radio, setRadio] = React.useState("A");
  const [open, setOpen] = React.useState(false);
  const [runs, setRuns] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);

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

  const question = {
    id: 0,
    text: "At which venue did Virat Kohli make his Test debut?",
    answer: "A",
  };

  const handleSubmit = async () => {
    let runsToAward = 5;
    if (radio === question.answer) {
      runsToAward += 5;
    }
    setRuns(runsToAward);

    const contract = new ethers.Contract(contractAddress, SeamlessAbi, signer);

    if (!isLoading) {
      setIsSuccess(false);
      setIsLoading(true);
      const activityTxn = await contract.performActivity(
        address,
        "Answered questions in quiz",
        runsToAward,
        0
      );
      setInfoOpen(true);
      calculateLeaderboard({ runs: runsToAward, address: `${address}` });
      activityTxn.wait().then(async (receipt) => {
        setIsLoading(false);
        if (receipt.status === 1) {
          setIsSuccess(true);
          setOpen(true);
          setInfoOpen(false)
        }
      });
    }

  };

  const { address, web3Provider } = useWeb3AuthContext();
  const signer = web3Provider.getSigner(address);

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
        QUIZZES
      </Typography>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          {question.text}
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={radio}
          onChange={(e) => setRadio(e.target.value)}
        >
          <FormControlLabel
            value="A"
            control={<Radio />}
            label="Sabina Park, Kingston, Jamaica"
          />
          <FormControlLabel
            value="B"
            control={<Radio />}
            label="Kensington Oval, Bridgetown, Barbados"
          />
          <FormControlLabel
            value="C"
            control={<Radio />}
            label="Queen's Park Oval, Port-of-Spain, Trinidad"
          />
        </RadioGroup>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button type="button" variant="contained" disabled={isSuccess || isLoading} sx={buttonSx} onClick={handleSubmit}>
            Submit
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
          </Button>
        </Box>
      </FormControl>
      <Snack
        open={open}
        handleClose={handleClose}
        text={`You got +${runs} runs for watching ICC TV!`}
        type="success"
      />
      <Snack
        open={isLoading && infoOpen}
        handleClose={handleCloseInfo}
        text={`Thanks for participating in Quiz! Awarding you +${runs} runs.`}
        type="info"
      />
    </Box>
  );
}

export default Quiz;
