import StorefrontIcon from "@mui/icons-material/Storefront";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";
import TicketModal from "./TicketModal";

export default function MatchCard({
  id,
  name,
  generalScore,
  vipScore,
  startTime,
  date,
  venue,
  image,
  matchType,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <TicketModal
        id={id}
        open={open}
        handleClose={handleClose}
        generalScore={generalScore}
        vipScore={vipScore}
        startTime={startTime}
        venue={venue}
        date={date}
        name={name}
        matchType={matchType}
      />

      <Card sx={{ width: 350 }}>
        <CardMedia component="img" height="200" image={image} alt="match1" />
        <CardContent>
          <Stack direction="row" spacing={0.5}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ mt: 1.4 }}
            >
              {name}
            </Typography>
            <Tooltip title="Buy Ticket">
              <IconButton
                aria-label="buyticket"
                sx={{ p: 2 }}
                size="large"
                onClick={handleOpen}
              >
                <StorefrontIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack direction="column" spacing={0.5}>
            <Stack direction="row" spacing={0.5}>
              <Chip label={date} variant="outlined" size="small" />
              <Chip label={startTime} variant="outlined" size="small" />
            </Stack>
            <Stack direction="row" spacing={0.5}>
              <Chip label={venue} variant="outlined" size="small" />
              <Chip label={matchType} variant="outlined" size="small" />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
