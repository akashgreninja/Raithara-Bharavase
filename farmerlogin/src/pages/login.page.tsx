import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Logo } from "../assets";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Image = styled.img`
    height: 50px;
`;

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);

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

    const navigate = useNavigate();

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
                        {isLogin ? "Login" : "Register"}
                    </Typography>
                    <Box component="form" onSubmit={isLogin ? handleLogin : handleRegister}
                        sx={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        {!isLogin && (
                            <>
                                <TextField
                                    variant="outlined"
                                    label="Full Name"
                                    type="password"
                                    sx={{ mb: 2 }}
                                    required
                                />
                                <TextField
                                    variant="outlined"
                                    label="Aadhaar Number"
                                    type="password"
                                    sx={{ mb: 2 }}
                                    required
                                />
                            </>
                        )}
                        <TextField
                            variant="outlined"
                            label="Aadhaar Number"
                            sx={{ mb: 2 }}
                            required
                        />

                        <Button variant="contained" type="submit" sx={{ mb: 2, height: '50px' }} onClick={() => navigate("/otpverify")}>
                            {isLogin ? "Login" : "Register"}
                        </Button>
                        <Typography variant="body2">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <Button color="primary" onClick={toggleIsLogin}>
                                {isLogin ? "Register" : "Login"}
                            </Button>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default LoginPage;
