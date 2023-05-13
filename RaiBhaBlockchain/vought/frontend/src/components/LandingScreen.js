import { Collapse, IconButton, Stack, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import LandingScreenImage from "../images/LandingScreenImage.jpg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import useWindowPosition from "../hooks/useWindowPosition";
import { Link as Scroll } from "react-scroll";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import ConnectMetaMaskCard from "./ConnectMetaMaskCard";

const ConnectScreen = () => {
  const checked = useWindowPosition("landing");
  const { address } = useWeb3AuthContext();

  return (
    <div
      id="connect-screen"
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!address && <ConnectMetaMaskCard checked={checked} />}
    </div>
  );
};

export const LandingScreen = () => {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${LandingScreenImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        // '&::-webkit-scrollbar': { width: 0, height: 0 }
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Collapse
          in={checked}
          {...(checked ? { timeout: 1000 } : {})}
          collapsedSize={20}
        >
          <Stack id="landing" alignContent="center" alignItems="center">
            <Typography variant="h2" sx={{ color: "white" }}>
              ONE PLACE FOR ALL FOOD CHAIN TRANSACTIONS sasa
              <br />
            
              <span
                style={{
                  color: "red",
                }}
              >
              
              </span>
            </Typography>
            <Scroll to="connect-screen" smooth={true}>
              <IconButton>
                <KeyboardArrowDownIcon
                  sx={{
                    color: "#5aff3d",
                    fontSize: "2.5em",
                  }}
                />
              </IconButton>
            </Scroll>
          </Stack>
        </Collapse>
      </div>
      <ConnectScreen />
    </div>
  );
};
