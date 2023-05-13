import React, { useState, useEffect, useCallback, useContext } from "react";
import { ethers } from "ethers";
import SocialLogin from "@biconomy/web3-auth";
import "@biconomy/web3-auth/dist/src/style.css";

export const Web3AuthContext = React.createContext({
  connect: () => Promise.resolve(null),
  disconnect: () => Promise.resolve(),
  loading: false,
  provider: null,
  ethersProvider: null,
  web3Provider: null,
  address: "",
  chainId: 5,
});

export const useWeb3AuthContext = () => useContext(Web3AuthContext);

export const Web3AuthProvider = ({ children }) => {
  const [web3State, setWeb3State] = useState({
    provider: null,
    web3Provider: null,
    ethersProvider: null,
    address: "",
    chainId: 5,
  });
  const { provider, web3Provider, ethersProvider, address, chainId } =
    web3State;
  const [loading, setLoading] = useState(false);
  const [socialLoginSDK, setSocialLoginSDK] = useState(null);

  useEffect(() => {
    const initWallet = async () => {
      const sdk = new SocialLogin();
      await sdk.init({ chainId: ethers.utils.hexValue(5).toString() });
      setSocialLoginSDK(sdk);
    };
    if (!socialLoginSDK) initWallet();
  }, [socialLoginSDK]);

  useEffect(() => {
    console.log("hide wallet");
    if (socialLoginSDK && address) {
      socialLoginSDK.hideWallet();
    }
  }, [address, socialLoginSDK]);

  const connect = useCallback(async () => {
    console.log("called");
    if (address) return;
    if (socialLoginSDK?.provider) {
      setLoading(true);
      console.info("socialLoginSDK.provider", socialLoginSDK.provider);
      const web3Provider = new ethers.providers.Web3Provider(
        socialLoginSDK.provider
      );
      const signer = web3Provider.getSigner();
      const gotAccount = await signer.getAddress();
      setWeb3State({
        provider: socialLoginSDK.provider,
        web3Provider: web3Provider,
        ethersProvider: web3Provider,
        address: gotAccount,
        chainId: 5,
      });
      setLoading(false);
      return;
    }
    if (socialLoginSDK) {
      socialLoginSDK.showWallet();
      return socialLoginSDK;
    }
    setLoading(true);
    const sdk = new SocialLogin();
    await sdk.init({ chainId: ethers.utils.hexValue(5).toString() });
    sdk.showWallet();
    setSocialLoginSDK(sdk);
    setLoading(false);
    return socialLoginSDK;
  }, [address, socialLoginSDK]);

  useEffect(() => {
    (async () => {
      if (socialLoginSDK?.provider && !address) {
        connect();
      }
    })();
  }, [address, connect, socialLoginSDK, socialLoginSDK?.provider]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (address) {
        clearInterval(interval);
      }
      if (socialLoginSDK?.provider && !address) {
        connect();
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [address, connect, socialLoginSDK]);

  const disconnect = useCallback(async () => {
    if (!socialLoginSDK || !socialLoginSDK.web3auth) {
      console.error("Web3Modal not initialized.");
      return;
    }
    await socialLoginSDK.logout();
    setWeb3State({
      provider: null,
      web3Provider: null,
      ethersProvider: null,
      address: "",
      chainId: 5,
    });
    socialLoginSDK.hideWallet();
  }, [socialLoginSDK]);

  return (
    <Web3AuthContext.Provider
      value={{
        connect,
        disconnect,
        loading,
        provider: provider,
        ethersProvider: ethersProvider || null,
        web3Provider: web3Provider || null,
        address: address || "",
        chainId: 5,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};
