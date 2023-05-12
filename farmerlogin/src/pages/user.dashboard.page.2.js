import styled from "@emotion/styled";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { blue, green, orange, red, grey } from "@mui/material/colors";

import userData from "../database/userDatabase.json";
import { Button, IconButton, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Chat } from "@mui/icons-material";
import { ChatbotComponent } from "../components";
import './style.css'

// interface UserProps {
//   name: string;
//   aadhaarCard: string;
//   epicNumber: string;
//   imageSrc: string;
// }

// interface ConstituencyProps {
//   state: string;
//   district: string;
//   constituency: string;
// }

const UserDashboardComponent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const TableWrapper = styled.div`
  margin-top: 20px;
`;

const TableTitle = styled.h2`
  font-size: 18px;
  margin: 10px 0;
  color: #1976d2;
`;

const UserTable = ({ name, aadhaarCard, epicNumber, imageSrc }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Full Name</th>
          <th>Aadhaar Number</th>
          <th>EPIC Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img src={imageSrc} alt="User" width="100" height="100" />
          </td>
          <td>{name}</td>
          <td>{aadhaarCard}</td>
          <td>{epicNumber}</td>
        </tr>
      </tbody>
    </table>
  );
};

const ConstituencyTable = ({ state, district, constituency }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>State</th>
          <th>District</th>
          <th>Constituency</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{state}</td>
          <td>{district}</td>
          <td>{constituency}</td>
        </tr>
      </tbody>
    </table>
  );
};

const SlotsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const slots = [
  { id: 1, time: "8:00 AM - 9:00 AM", availability: 10, isSelected: false },
  { id: 2, time: "9:00 AM - 10:00 AM", availability: 35, isSelected: false },
  { id: 3, time: "10:00 AM - 11:00 AM", availability: 50, isSelected: false },
  { id: 4, time: "11:00 AM - 12:00 PM", availability: 65, isSelected: false },
  { id: 5, time: "12:00 PM - 1:00 PM", availability: 20, isSelected: false },
  { id: 6, time: "1:00 PM - 2:00 PM", availability: 5, isSelected: false },
  { id: 7, time: "2:00 PM - 3:00 PM", availability: 30, isSelected: false },
  { id: 8, time: "3:00 PM - 4:00 PM", availability: 40, isSelected: false },
  { id: 9, time: "4:00 PM - 5:00 PM", availability: 55, isSelected: false },
  { id: 10, time: "5:00 PM - 6:00 PM", availability: 70, isSelected: false },
  { id: 11, time: "6:00 PM - 7:00 PM", availability: 90, isSelected: false },
];

// const getBackgroundColor = (isSelected: boolean, availability: number) => {
//   if (isSelected) {
//     return "#1976d2"; // Material-UI blue
//   } else if (availability >= 75) {
//     return green[500] + 40; // Material-UI green
//   } else if (availability >= 50) {
//     return orange[500] + 40; // Material-UI orange
//   } else if (availability >= 25) {
//     return red[500] + 40; // Material-UI red
//   } else {
//     return grey[500] + 40; // Material-UI grey
//   }
// };

const SlotsCard = () => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleSlotClick = (id) => {
    setSelectedSlot(id);
  };
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBtnClick = () => {
    if (selectedSlot) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 5000);

      setTimeout(() => {
        navigate("/slotbook/success");
      }, 7000);
    }
  };

  return (
    <div>
      <Typography variant="h6" color="primary" mb={3} sx={{ fontWeight: 700 }}>
        Select a time slot:
      </Typography>
      <SlotsWrapper></SlotsWrapper>
      <LoadingButton
        variant="outlined"
        sx={{ width: "100%", height: "50px", margin: "20px 0" }}
        loading={loading}
        onClick={handleBtnClick}
        disabled={success}
      >
        {success ? "Booked" : "Proceed to Book Slot"}
      </LoadingButton>
    </div>
  );
};

const UserDashboardx = () => {
  const [income, setIncome] = useState("");
  const [familyMembers, setFamilyMembers] = useState("");
  const [landAceres, setLandAceres] = useState("");
  const [eligibleSchemes, setEligibleSchemes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check income range
    const lister = [
      "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      "National Agriculture Insurance Scheme (NAIS)",
      "Paramparagat Krishi Vikas Yojana (PKVY)",
      "Rashtriya Krishi Vikas Yojana (RKVY)",
      "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
      "Soil Health Card Scheme",
      "Pradhan Mantri Kisan Samman Nidhi Yojana (PM-Kisan)",
      "Kisan Credit Card Scheme (KCC)",
      "National Mission on Sustainable Agriculture (NMSA)",
      "Pradhan Mantri Gram Sinchai Yojana (PMGSY)",
      "Pradhan Mantri Sichai Yojana (PMSY)",
      "Interest Subvention Scheme for Crop Loans",
      "National Food Security Mission (NFSM)",
      "National Mission for Protein Supplements (NMPS)",
      "National Bamboo Mission",
      "Livestock Insurance Scheme",
      "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
      "Rashtriya Gokul Mission",
      "Neem Coating of Urea Scheme",
      "Pradhan Mantri Kisan Sampada Yojana"
    ];
    const randomIndex = Math.floor(Math.random() * lister.length);
    if (income >= 100000 && income < 200000) {
      

      setEligibleSchemes([lister[randomIndex + 1], lister[randomIndex]] ,lister[randomIndex]);
    } else if (income < 50000) {
      setEligibleSchemes([lister[randomIndex]],lister[randomIndex]);
    } else {
      setEligibleSchemes([]);
    }
  };
  const [activeChat, setActiveChat] = useState(false);

  const params = useParams();
  const id = params.id;

  const [user, setUser] = useState({
    userAvatar: "",
    name: "",
    aadhaar: "",
    epic: "",
    hasBookedSlot: false,
    state: "",
    district: "",
    constituency: "",
    slots: [{}],
    uuid: "",
  });

  useEffect(() => {
    const data = userData.data.filter((item) => item.uuid === id);
    setUser(data[0]);
    console.log(user);
  }, []);

  return (
    <>
      {!activeChat ? (
        <UserDashboardComponent>
          <TableTitle>Profile Details</TableTitle>

          <UserTable
            name={user.name}
            aadhaarCard={user.aadhaar}
            epicNumber={user.epic}
            imageSrc={user.userAvatar}
          />

          <br />
          <div>
            <h2>Farmer Form</h2>
            <div class="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="income">Farmer Income:</label>
          <input
            type="number"
            id="income"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="familyMembers">Members in the Family:</label>
          <input
            type="number"
            id="familyMembers"
            value={familyMembers}
            onChange={(e) => setFamilyMembers(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="landAceres">Acres of Land:</label>
          <input
            type="number"
            id="landAceres"
            value={landAceres}
            onChange={(e) => setLandAceres(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

            {eligibleSchemes.length > 0 && (
              <div>
                <h3>Eligible Schemes:</h3>
                <ul>
                  {eligibleSchemes.map((scheme, index) => (
                    <li key={index}>{scheme}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            sx={{
              position: "fixed",
              bottom: 0,
              right: 0,
              width: "70px",
              height: "70px",
              background: "#1976d230",
              margin: "0 20px 20px 0",
            }}
            onClick={() => setActiveChat(!activeChat)}
          >
            <Chat />
          </IconButton>
        </UserDashboardComponent>
      ) : (
        <ChatbotComponent state={setActiveChat} />
      )}
    </>
  );
};

export default UserDashboardx;
