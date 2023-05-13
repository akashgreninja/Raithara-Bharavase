import {
  Box,
  Button,
  Card,
  CardContent,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";
import React from "react";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import {
  abi as MatchTicketAbi,
  contract as contractAddress,
} from "../MatchTicketData";
import ProfileCard from "./shareableProfile";
import Snack from "./Snackbar";

export const TestingPlayground = () => {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = React.useState("");
  const [type, setType] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const { address, web3Provider } = useWeb3AuthContext();
  const signer = web3Provider.getSigner(address);

  const handleClick = async () => {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: signer,
      type: 1, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `Seamless ICC`,
        body: `Streak notification`,
      },
      payload: {
        title: `Keep up your Seamless streak`,
        body: `Intereact with ICC content on Seamless to earn Runs and climb leaderboard. Streaks award more points on interaction!`,
        cta: "",
        img: ``,
      },
      channel: "eip155:5:0x1C48137DC8B04764B83776456DaC37aF6B94cBf8", // your channel address
      env: "staging",
    });
  };

  const checkin = async (e) => {
    e.preventDefault();
    const fanAddress = e.target[0].value;
    const matchId = parseInt(e.target[2].value);
    const seatId = e.target[4].value;

    const contract = new ethers.Contract(
      contractAddress,
      MatchTicketAbi,
      signer
    );
    if (!isLoading) {
      const txn = await contract.ticketCheckin(fanAddress, seatId, matchId);
      setIsLoading(true);
      setIsSuccess(false);
      const rc = await txn.wait();
      setIsLoading(false);
      if (rc.status === 1) {
        setIsSuccess(true);
      }
      const event = rc.events.find((event) => event.event === "StadiumCheckin");
      if (!event) {
        setText("Ticket is not valid");
        setType("error");
        setOpen(true);
        return;
      }
      const [adr, mId, sId] = event.args;
      if (adr === fanAddress && parseInt(mId) === matchId && sId == seatId) {
        setText("Ticket is valid");
        setType("success");
      } else {
        setText("Ticket is not valid");
        setType("error");
      }
      setOpen(true);
    }
  };

  return (
    <div>
      <Card variant="outlined">
        <CardContent>
          <h2>Sending notifications</h2>
          <p>
            Sending notifications like streak reminders, transaction
            confirmations, etc.
          </p>
          <Button variant="contained" onClick={handleClick}>
            Send notification
          </Button>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <h2>Ticket check-in</h2>
          <p>
            When a fan reaches stadium, we scan their crypto wallet's QR code
            and enter the match ID to check if they hold the ticket to that
            match.
          </p>
          <form onSubmit={checkin}>
            <TextField placeholder="Address" />
            <TextField placeholder="Match ID" />
            <TextField placeholder="Seat number" /> <br />
            <Button variant="contained" type="submit">
              Check in
            </Button>
          </form>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isLoading && (
              <>
                <Box sx={{ width: "80%", mr: 1 }}>
                  <LinearProgress />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color="text.secondary">
                    Checking Match Ticket
                  </Typography>
                </Box>
              </>
            )}
            {isSuccess && !isLoading && (
              <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                  {text}
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
      <Snack open={open} handleClose={handleClose} text={text} type={type} />

      <Card variant="outlined">
        <CardContent>
          <h2>Shareable profile</h2>
          <p>
            This card can be shared with other players to flaunt their stats.
          </p>
          <ProfileCard />
        </CardContent>
      </Card>
    </div>
  );
};
