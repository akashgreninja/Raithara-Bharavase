import CurrencyBitcoinIcon from "@mui/icons-material/CurrencyBitcoin";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import * as React from "react";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import Logo from "../images/seamless_logo.jpeg";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import Transak from "@biconomy/transak";
import Modal from "@mui/material/Modal";
import QRCodeImage from "../images/qrcodeimg.webp";

const settings = ["Profile", "Account", "Logout"];

function TopAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElShare, setAnchorElShare] = React.useState(null);

  // Modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenShareMenu = (event) => {
    setAnchorElShare(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseShareMenu = () => {
    setAnchorElShare(null);
  };

  const { address, disconnect } = useWeb3AuthContext();

  const buyCrypto = () => {
    const transak = new Transak("STAGING", {
      walletAddress: address,
    });

    transak.init();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Box component="img" src="./seamless_logo.jpeg" alt="seamless logo" sx={{ height: "50px", width: "auto" }} /> */}
          <Card sx={{ width: 100 }}>
            <CardMedia component="img" height="40" image={Logo} alt="logo" />
          </Card>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          <IconButton
            onClick={handleOpen}
            aria-label="qrscanner"
            sx={{ p: 2 }}
            size="large"
          >
            <QrCodeScannerIcon fontSize="medium" />
          </IconButton>

        

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
                width: 300,
                bgcolor: "background.paper",
                border: "0px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                QR Code
              </Typography>
              <Card sx={{ width: 300 }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={QRCodeImage}
                  alt="qrcode"
                />
              </Card>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Scan this QR Code for carrying out transactions.
              </Typography>
            </Box>
          </Modal>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 2 }}
                size="large"
              >
                <AccountBoxIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => disconnect()}>
                <Typography textAlign="center">Disconnect Wallet</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "inline",
              fontFamily: "sans-serif",
              fontWeight: 1,
              letterSpacing: ".01rem",
              color: "rgba(11,53,94,255)",
              textDecoration: "none",
              fontSize: 15,
              textOverflow: "ellipsis",
              width: 150,
              overflow: "hidden",
            }}
          >
            {address}
          </Typography>
          {/* <Button variant="contained" href = "https://fontawesomeicons.com/materialdesign/icons/qr_code_scanner" color="primary" startIcon={<ShareIcon/>}>
            Share
          </Button> */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Share">
              <IconButton
                onClick={handleOpenShareMenu}
                sx={{ p: 2 }}
                size="large"
              >
                <ShareIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElShare}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElShare)}
              onClose={handleCloseShareMenu}
            >
              <IconButton aria-label="delete" sx={{ p: 2 }} size="large">
                <FacebookIcon color="primary" />
              </IconButton>
              <IconButton aria-label="delete" sx={{ p: 2 }} size="large">
                <InstagramIcon color="primary" />
              </IconButton>
              <IconButton aria-label="delete" sx={{ p: 2 }} size="large">
                <WhatsAppIcon color="primary" />
              </IconButton>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopAppBar;
