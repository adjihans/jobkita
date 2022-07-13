import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../assets/images/homepage-jumbotron-background.jpg";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

export const Homepage = () => {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  return (
    <Jumbotron>
      <Navbar />
      <div className="description-container">
        <Title>Jobkita</Title>
        <Description>Where candidate and interviewer matched</Description>
        <SearchBar role={role} location={location} />
      </div>
    </Jumbotron>
  );
};

export default Homepage;

const Jumbotron = styled.div`
  width: 100%;
  height: 100vh;
  background: white url(${BackgroundImage}) no-repeat fixed center;
  background-size: 100vw;

  display: flex;
  flex-direction: column;

  .description-container {
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  color: #25282b;
`;

const Description = styled.div`
  font-size: 24px;
  color: #25282b;
  margin: 8px 0;
`;
