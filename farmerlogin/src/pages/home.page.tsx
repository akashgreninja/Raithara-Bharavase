import styled from '@emotion/styled'
import React from 'react'
import { CarouselImage1, ElecthonPoster } from '../assets';
import { CarouselSlider, ElectionsCard } from '../components';
import { Typography } from '@mui/material';
import { serialize } from 'v8';

import ElectionData from "../database/index.json"


const HomepageContainer = styled.div`
    padding: 1em;
`;

const MainImage = styled.img`
    width: 100%;
    height: 500px;
    border-radius: 10px;
`;

const HonourableCommission = styled.div`
    width: 400px;
    min-height: 300px;
    background: #f2f2f2;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-self: flex-start;

    @media (max-width: 1000px){
        width: 500px;
    }
`;

const CommissionsImage = styled.img`
    height: 90px;
    width: 80px;
    border-radius: 5px;
`;

const CommissionCard = styled.div`
    display: flex;
    background: #1976D2;
    margin: 10px 0 0 0;
    padding: 5px;
    border-radius: 10px;
    gap: 15px;
`;

const LiveVoting = styled.div`
    display: flex;
    // justify-content: center;
    flex-direction: column;
    
`

const HomePage = () => {

    console.log(ElectionData)

    return (
        <HomepageContainer>
            <MainImage src={ElecthonPoster}>
            </MainImage>
            <br />
            <br />
            <div style={{ display: 'flex', gap: '20px' }}>
                <HonourableCommission>
                    <Typography color="primary" sx={{
                        fontWeight: 700,
                        fontSize: '16px'
                    }}>
                        Candidates List

                    </Typography>
                    <CommissionCard>
                        <CommissionsImage src="https://eci.gov.in/img/ec-rk.jpg"></CommissionsImage>
                        <div className="wrapper">
                            <div className="honourable-mentions-title">
                                Rajiv Kumar
                            </div>

                            <div className="honourable-mentions-role">
                                BJP
                            </div>
                        </div>
                    </CommissionCard>
                    <CommissionCard>
                        <CommissionsImage src="https://eci.gov.in/img/ec-acp.jpg"></CommissionsImage>
                        <div className="wrapper">
                            <div className="honourable-mentions-title">
                                Anup Chandra Pandey
                            </div>

                            <div className="honourable-mentions-role">
                                JDS
                            </div>
                        </div>
                    </CommissionCard>
                    <CommissionCard>
                        <CommissionsImage src="https://eci.gov.in/img/ec-ag.jpg"></CommissionsImage>
                        <div className="wrapper">
                            <div className="honourable-mentions-title">
                                Arul Goel
                            </div>

                            <div className="honourable-mentions-role">
                                Congress
                            </div>
                        </div>
                    </CommissionCard>
                </HonourableCommission>
                <LiveVoting>
                    <div>
                        <Typography variant="h6" color="primary" mb={2} sx={{ fontWeight: 700 }}>Elections</Typography>
                    </div>
                    <Typography color="primary" mb={1} sx={{ fontWeight: 500 }}>Details of Live and Upcoming Elections</Typography>

                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {ElectionData.data.map((item) => {
                            return (
                                <ElectionsCard obj={item} />
                            )
                        })}
                    </div>

                </LiveVoting>
            </div>

        </HomepageContainer>
    )
}

export default HomePage