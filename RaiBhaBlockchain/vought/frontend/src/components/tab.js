import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DashboardComp from "./dashboard";
import LeaderboardComp from "./leaderboard";
import ICCTVComp from "./icctv";
import ICCAwards from "./Awards";
import Quiz from "./Quiz";
import MyTickets from "./MyTickets";
import BuyTicketsComp from "./buytickets";
import MerchandiseComp from "./Merchandise";
import { TestingPlayground } from "./TestingPlayground";
import BuyPointsComp from "./BuyPoints";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function LeftVerticalTab() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 600,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Dashboard" {...a11yProps(0)} />
        <Tab label="STATUS" {...a11yProps(1)} />
        <Tab label="TRANSACTIONS" {...a11yProps(2)} />
        {/* <Tab label="Merchandise" {...a11yProps(3)} />
        <Tab label="Buy Tickets" {...a11yProps(4)} />
        <Tab label="Buy Points" {...a11yProps(5)} />
        <Tab label="ICC Awards" {...a11yProps(6)} />
        <Tab label="Quizzes" {...a11yProps(7)} />
        <Tab label="My NFTs" {...a11yProps(8)} />
        <Tab label="Testing" {...a11yProps(9)} /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        <DashboardComp />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LeaderboardComp />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ICCTVComp />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <MerchandiseComp />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <BuyTicketsComp />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <BuyPointsComp />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <ICCAwards />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <Quiz />
      </TabPanel>
      <TabPanel value={value} index={8}>
        <MyTickets />
      </TabPanel>
      <TabPanel value={value} index={9}>
        <TestingPlayground />
      </TabPanel>
    </Box>
  );
}
