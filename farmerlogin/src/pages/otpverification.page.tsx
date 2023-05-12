import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Logo } from "../assets";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Image = styled.img`
    height: 50px;
`;

const OTPVerification = () => {

    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [otp, setOTP] = useState("");

    const toggleIsLogin = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = (e: any) => {
        e.preventDefault();
        // handle login logic
    };

    const handleRegister = (e: any) => {
        e.preventDefault();
        // handle register logic
    };

    const handleContinue = () => {
        if (otp === "1234") {
            navigate("/user/dashboard/6q7r8s9t-0u1v-2w3x-4y5z-a6b7c8d9e0f")
        }
        else if (otp === "2345") {
            navigate("/user/dashboard/6q7r8s9t-0u1v-2w3x-4y5z-a6b7c8d9e2e")

        }
        else {
            navigate("/user/dashboard/1a2b3c4d-5e6f-7g8h-9i0j-k1l2m3n4o5p")
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "20px",
                    alignItems: "center",
                    height: "80vh",
                }}
            >
                <Image src={Logo}></Image>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        bgcolor: "background.paper",
                        p: 4,
                        borderRadius: '10px',
                        boxShadow: 5,
                        minWidth: '400px'
                    }}
                >
                    <Typography variant="h5" color="primary" mb={3} sx={{ fontWeight: 700 }}>
                        Enter OTP
                    </Typography>
                    <Box component="form" onSubmit={isLogin ? handleLogin : handleRegister}
                        sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <TextField
                            variant="outlined"
                            label="OTP"
                            sx={{ mb: 2 }}
                            onChange={(e) => setOTP(e.target.value)}
                            required
                        />

                        <Button variant="contained" type="submit" sx={{ mb: 2, height: '50px' }} onClick={() => handleContinue()}>
                            Continue
                        </Button>
                        <Typography variant="body2">
                            Didn't Receive OTP?
                            <Button color="primary" onClick={toggleIsLogin}>
                                Resend
                            </Button>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default OTPVerification;
