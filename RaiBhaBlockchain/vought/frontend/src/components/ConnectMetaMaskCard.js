import { CardActionArea, Collapse } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import FoxImage from "../images/login.png";

export default function ConnectMetaMaskCard({ checked }) {
  const { connect } = useWeb3AuthContext();
  return (
    <Collapse
      in={checked}
      {...(checked ? { timeout: 1000 } : {})}
      collapsedSize={20}
    >
      <Card sx={{ maxWidth: 345 }} elevation={5}>
        <CardActionArea onClick={() => connect()}>
          <CardMedia
            component="img"
            sx={{
              height: 140,
              objectFit: "cover",
              background: "rgba(47,77,5,0.6)",
            }}
            image={FoxImage}
            title="Connect Wallet"
          />
          <CardContent
            sx={{
              background: "rgba(22,50,3,0.5)",
              color: "#fff",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              Login to Seamless
            </Typography>
            <Typography variant="body2" color="#ddd">
              You can either connect your wallet or sign in through socials.
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions
          sx={{
            background: "rgba(22,50,3,0.5)",
          }}
        >
          <Button size="small" sx={{ color: "#5aff3d" }}>
            <a
              style={{ color: "inherit", textDecoration: "none" }}
              href="https://learn.metamask.io/"
              target="_blank"
              rel="noreferrer"
            >
              Curious about Web3?
            </a>
          </Button>
        </CardActions>
      </Card>
    </Collapse>
  );
}
