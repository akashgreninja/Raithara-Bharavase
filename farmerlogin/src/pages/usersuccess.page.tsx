import styled from "@emotion/styled";
import React from "react";
import { SuccessImage } from "../assets";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./style.css";
// const div = styled.div`
//     display: flex;
//     flex-direction: row;
//     gap: 10px;
//     align-items: center;
//     justify-content: center;
//     color: #3bdb30;
// `;

const SuccessContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SuccessTab = styled.div`
  width: 400px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  color: #3bdb30;
`;

const Image = styled.img`
  width: 100px;
`;

const UserSuccess = () => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    setTimeout(() => {
      navigate("/");
    }, 2000);
    //   navigate("/");
  };

  const HandleClick = () => {
    navigate("/");
  };
  const navigate = useNavigate();
  return (
    <SuccessContainer>
      <SuccessTab>
        <Image src={SuccessImage}></Image>
        <div className="do-the-column">
          <div className="inner-do">
            <img
              src="https://img.etimg.com/thumb/msid-100192258,width-362,height-240,imgsize-21008,resizemode-4/news/politics-and-nation/odisha-assembly-speaker-two-ministers-resign.jpg"
              alt=""
              width={300}
            />
            <button className="testers" onClick={togglePopup}>
              <span className="text">Vote</span>
            </button>
          </div>
          <div className="inner-do">
            <img
              src="https://st1.photogallery.ind.sh/wp-content/uploads/indiacom/supriya-sule-of-nationalist-congress-party-201605-1462862662.jpg?impolicy=Medium_Widthonly&w=450"
              alt=""
              width={200}
            />
            <button className="testers" onClick={togglePopup}>
              <span className="text">Vote</span>
            </button>
          </div>
          <div className="inner-do">
            <img
              src="https://www.elections.in/images/Arvind.jpg"
              alt=""
              width={150}
            />
            <button className="testers " onClick={togglePopup}>
              <span className="text">Vote</span>
            </button>
          </div>
        </div>
        <Button color="primary" onClick={() => navigate("/")}>
          Navigate to Home
        </Button>
      </SuccessTab>
      {isOpen && (
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={togglePopup}>
              &times;
            </span>
            <p>Sucessfully voted </p>
          </div>
        </div>
      )}
    </SuccessContainer>
  );
};

export default UserSuccess;
