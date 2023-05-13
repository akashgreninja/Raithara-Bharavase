import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import CricketMatch from "../images/match3.png";
import { green } from "@mui/material/colors";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { calculateLeaderboard } from "../utils/Leaderboard.util";
import { ethers } from "ethers";
import QRCode from "qrcode";
import {
  abi as SeamlessAbi,
  contract as contractAddress,
} from "../SeamlessContractData";
import { useWeb3AuthContext } from "../contexts/SocialLoginContext";
import Snack from "./Snackbar";
import { useScoreCard } from "../hooks/useScoreCard";
import "./icctv.css";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ICCTVComp() {
  const [product, setProduct] = useState("");
  const [quality, setQuality] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [farmerName, setFarmerName] = useState("");
  const [farmerPlace, setFarmerPlace] = useState("");
  const [qrCodeURL, setQRCodeURL] = useState("");
  const [scannedQR, setScannedQR] = useState("");
  const [productDetails, setProductDetails] = useState([]);

  const generateQRCode = (e) => {
    e.preventDefault();

    const qrText = `Product: ${product}\nQuality: ${quality}\nPrice: ${price}\nWeight: ${weight} kgs\nFarmer: ${farmerName}\nPlace: ${farmerPlace}`;

    QRCode.toDataURL(qrText, { width: 128, height: 128 })
      .then((url) => {
        setQRCodeURL(url);
      })
      .catch((error) => {
        console.error("Error generating QR code:", error);
      });
  };

  const handleImageUpload = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = (event) => {
      const qrCodeImageURL = event.target.result;

      QRCode.scan(qrCodeImageURL)
        .then((result) => {
          setScannedQR(result);
          setProductDetails(result.split("\n"));
        })
        .catch((error) => {
          console.error("Error scanning QR code:", error);
        });
    };

    const file = e.target.files[0];
    reader.readAsDataURL(file);
  };
  const retrieveDetails = (e) => {
    e.preventDefault();

    const details = scannedQR.trim().split("\n");

    setProductDetails(details);
  };
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [infoOpen, setInfoOpen] = React.useState(false);
  const runsAwarded = 10;
  const { address, web3Provider } = useWeb3AuthContext();
  const score = useScoreCard(address);

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

  const signer = web3Provider.getSigner(address);
  const watchTime = async () => {
    const contract = new ethers.Contract(contractAddress, SeamlessAbi, signer);
    if (!isLoading) {
      setIsSuccess(false);
      setIsLoading(true);
      const activityTxn = await contract.performActivity(
        address,
        "Watched ICC TV for 15 minutes",
        runsAwarded,
        0
      );
      setInfoOpen(true);
      calculateLeaderboard({ runs: 10, address: `${address}` });
      activityTxn.wait().then(async (receipt) => {
        setIsLoading(false);
        console.log("Receipt: ", receipt);
        if (receipt.status === 1) {
          setIsSuccess(true);
          setOpen(true);
        }
      });
    }
  };

  return (
    //<div>
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
        FOOD CHAIN SUPPLY TRANSACTIONS
      </Typography>
      <Stack direction="row" spacing={5}>
        <Card sx={{ width: 920 }}>
          <CardMedia
            component="img"
            height="400"
            image={CricketMatch}
            alt="video"
          />
          <CardContent>
            <Stack direction="row" spacing={0.1}>
              <Box sx={{ m: 0.1, position: "relative" }}>
                <Button
                  variant="contained"
                  disabled={isLoading || isSuccess}
                  onClick={watchTime}
                  sx={buttonSx}
                >
                  To Do Transactions
                </Button>
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
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <h1>QR Code Generator</h1>

      <form onSubmit={generateQRCode}>
        <label htmlFor="product">Product:</label>
        <input
          type="text"
          id="product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />

        <label htmlFor="quality">Quality:</label>
        <input
          type="text"
          id="quality"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="weight">Weight (in kgs):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />

        <label htmlFor="farmerName">Farmer Name:</label>
        <input
          type="text"
          id="farmerName"
          value={farmerName}
          onChange={(e) => setFarmerName(e.target.value)}
          required
        />

        <label htmlFor="farmerPlace">Farmer Place:</label>
        <input
          type="text"
          id="farmerPlace"
          value={farmerPlace}
          onChange={(e) => setFarmerPlace(e.target.value)}
          required
        />

        <input type="submit" value="Generate QR Code" />
      </form>

      {qrCodeURL && (
        <div id="qrCode">
          <img src={qrCodeURL} alt="QR Code" />
          <a href={qrCodeURL} download="qrcode.png">
            Download QR Code
          </a>
        </div>
      )}

      <hr />

      <h2>Scan QR Code</h2>
      <form>
        <input type="file" accept="image/*"/>
        <button onClick={handleImageUpload}>Scan QR Code</button>
      </form>

       
      {/* {productDetails.length > 0 && (
        <div id="productDetails">
          <h3>Product Details:</h3>
          <ul>
            {productDetails.map((detail, index) => {
              const [key, value] = detail.split(":");
              return (
                <li key={index}>
                  <strong>{key.trim()}</strong>: {value.trim()}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {productDetails.length === 0 && scannedQR && (
        <div id="noProductDetails">No product details found in the scanned QR code.</div>
      )} */}
    </Box>
  );
}
