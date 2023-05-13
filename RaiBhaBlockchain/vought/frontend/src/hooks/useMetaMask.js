import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

/* Add chain ids accordingly */
export const injected = new InjectedConnector({
  supportedChainIds: [1, 5, 1337],
});

export const MetaMaskContext = React.createContext(null);
export const MetaMaskProvider = ({ children }) => {
  const { activate, account, library, connector, active, deactivate } =
    useWeb3React();
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const connectWallet = async () => {
    try {
      await activate(injected);
    } catch (err) {}
  };
  // Will run iniitially on app load
  useEffect(() => {
    connectWallet().then((val) => setIsLoading(false));
  }, []);

  //Memoized function for checking if metamask is connected to our app
  const handleIsActive = useCallback(() => {
    setIsConnected(active);
  }, [active]);

  //Run on connecting/disconnecting metamask
  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  const disconnectWallet = async () => {
    try {
      await deactivate();
    } catch (err) {
      console.log("Error while disconnecting from MetaMask: ", err);
    }
  };

  //Values to expose via context
  const values = useMemo(
    () => ({
      isConnected,
      isLoading,
      account,
      connectWallet,
      disconnectWallet,
      library,
    }),
    [isConnected, isLoading]
  );
  return (
    <MetaMaskContext.Provider value={values}>
      {children}{" "}
    </MetaMaskContext.Provider>
  );
};

export const useMetaMask = () => {
  const context = React.useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error(
      "useMetaMask hook to be used inside <MetaMaskProvider/> component"
    );
  }
  return context;
};
