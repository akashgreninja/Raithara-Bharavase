import React from "react";
import { useNFTs } from "../hooks/useNFTs";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function MyTickets() {
  const nfts = useNFTs();
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
        MY NFTs
      </Typography>
      <Stack direction={"row"} spacing={3} flexWrap>
        {nfts &&
          nfts.userNFTs.map((nft) => (
            <Card>
              <CardContent>
                <h3>
                  Ticket for {nft.matchName} - {nft.matchType}
                </h3>
                <p>Match Id: {parseInt(nft.matchId)}</p>
                <p>Stadium: {nft.venue}</p>
                <p>Date: {nft.date}</p>
                <p>Seat: {nft.seat}</p>
                <p>Checked in: {nft.checkedIn ? "Yes" : "No"}</p>
              </CardContent>
            </Card>
          ))}
      </Stack>
    </Box>
  );
}

export default MyTickets;
