import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import PointsCard from "./PointsCard";
import Grow from '@mui/material/Grow';
import Points10 from "../images/10points.png";
import Points50 from "../images/50points.png";
import Points100 from "../images/100points.png";

export default function BuyPointsComp() {
  const points_items = [
    {
        id: 0,
        name: "Handful of points",
        amount: 10,
        price: 50,
        image: Points10,
    },
    {
      id: 1,
      name: "Bag of points",
      amount: 50,
      price: 250,
      image: Points50,
    },
    {
        id: 2,
        name: "Chest of points",
        amount: 100,
        price: 500,
        image: Points100,
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
        }}
      >
        <Typography
          variant="h5"
          color="black"
          fontFamily="Segoe UI Symbol"
          sx={{ mb: 5 }}
        >
          BUY POINTS
        </Typography>
        <Grow in={checked} style={{ transformOrigin: '1 1 1' }} {...(checked ? { timeout: 1000 } : {})}>
        <Stack direction="row" spacing={7}>
          {points_items.map((points) => (
            <PointsCard key={points.id} {...points} />
          ))}
        </Stack>
        </Grow>
      </Box>
    </div>
  );
}
