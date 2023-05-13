import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import { ethers } from "ethers";
import { green } from "@mui/material/colors";

import {
  abi as SeamlessAbi,
  contract as SeamlessAddress,
} from "../SeamlessContractData";
import Snack from "./Snackbar";
import { Box, CircularProgress } from "@mui/material";

export default function PointsCard({ name, amount, price, image }) {
  const [snackopen, setSnackOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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

  const handleSnackClose = (event, reason) => {
    if (reason === "clickway") {
      return;
    }

    setSnackOpen(false);
  };

  const { address, web3Provider } = useWeb3AuthContext();
  const signer = web3Provider.getSigner(address);

  const buy = async () => {
    setIsSuccess(false);
    setIsLoading(true);
    const weiValue = 5 * amount;
    const contract = new ethers.Contract(SeamlessAddress, SeamlessAbi, signer);
    const ptsTxn = await contract.buyPoints(
      amount,
      {
        value: ethers.utils.parseUnits(`${weiValue}`, "wei"),
      }
    )
    setInfoOpen(true);
    ptsTxn.wait().then(async (receipt) => {
      if (receipt.status === 1) {
        setIsSuccess(true);
        setSnackOpen(true);
        setIsLoading(false)
      }
    })
  };

  return (
    <>
      <Card sx={{ width: 370, height: 200 }}>
        <Stack
          direction="row"
          spacing={1}>
          <CardMedia sx={{ width: 120 }} component="img" height="200" image={image} alt="match1" />
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
                {name} ({amount} Points)
                </Typography>
              <Typography sx={{ fontSize: 14 }}>Cost: {price} wei</Typography>
              <Button variant="contained" onClick={buy} sx={buttonSx} disabled={isSuccess || isLoading}>
                BUY POINTS
                {isLoading && <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />}
              </Button>
            </Stack>
          </CardContent>
        </Stack>
      </Card>
      <Snack
        text={`You bought ${name}. Enjoy by buying our merch using these!`}
        open={snackopen}
        handleClose={handleSnackClose}
        type="success"
      />
      <Snack
        text={`Transacting your ${name}...`}
        open={isLoading && infoOpen}
        handleClose={handleSnackClose}
        type="info"
      />
    </>
  );
}
