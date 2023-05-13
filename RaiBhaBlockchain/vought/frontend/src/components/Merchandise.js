import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import MerchImg2 from "../images/merch2.avif";
import MerchImg3 from "../images/merch3.webp";
import MerchImg4 from "../images/merch4.avif";
import MerchCard from "./MerchCard.js";
import Grow from '@mui/material/Grow';

export default function MerchandiseComp() {
  const merch_items = [
    {
      id: 0,
      name: "ICC Women's T20 World Cup 2022 Logo T-shirt",
      color: "Navy Blue",
      price: 5,
      runsAwarded: 25,
      image: MerchImg2,
    },
    {
      id: 1,
      name: "England Men's T20 World Cup 2022 Team Cap",
      color: "White",
      price: 3,
      runsAwarded: 15,
      image: MerchImg3,
    },
    {
      id: 2,
      name: "ICC Women's T20 World Cup Match Graphic Hoodie",
      color: "Blue",
      price: 5,
      runsAwarded: 50,
      image: MerchImg4,
    },
  ];

  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    setChecked((prev) => !prev);
  }, []);

  return (
    <div>
      <Box
        sx={{
          st: 1,
          padding: 2,
          // backgroundColor: 'black'
        }}
      >
        <Typography
          variant="h5"
          color="black"
          fontFamily="Segoe UI Symbol"
          sx={{ mb: 5 }}
        >
          MERCHANDISE
        </Typography>
        <Grow in={checked} style={{ transformOrigin: '1 1 1' }} {...(checked ? { timeout: 1000 } : {})}>
        <Stack direction="row" spacing={7}>
          {merch_items.map((merch) => (
            <MerchCard key={merch.id} {...merch} />
          ))}
        </Stack>
        </Grow>
      </Box>
    </div>
  );
}
