import TopAppBar from "./components/appbar";
import { LandingScreen } from "./components/LandingScreen";
import LeftVerticalTab from "./components/tab";
import { useWeb3AuthContext } from "./contexts/SocialLoginContext";

function App() {
  const { address } = useWeb3AuthContext();
  return (
    <>
      {address ? (
        <>
          <TopAppBar />
          <LeftVerticalTab />
        </>
      ) : (
        <>
          <LandingScreen />
        </>
      )}
    </>
  );
}
export default App;
