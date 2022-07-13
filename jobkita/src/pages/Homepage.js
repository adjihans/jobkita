import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../assets/images/homepage-jumbotron-background.jpg";
import Navbar from "../components/Navbar";

export const Homepage = () => {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  return (
    <Jumbotron>
      <Navbar />
      <div className="description-container">
        <Title>Jobkita</Title>
        <Description>Where candidate and interviewer matched</Description>
        <SearchBarContainer>
          <input className="search-bar" placeholder="Role..." value={role} />
          <input
            className="search-bar"
            placeholder="Location..."
            value={location}
          />
          <button className="search-button">Search</button>
        </SearchBarContainer>
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

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;

  .search-bar {
    background-color: #ffffff;
    height: 30px;
    width: 250px;
    padding: 12px;
    margin: 0 16px;

    border-radius: 4px;
    border: #fff;
    font-size: 16px;

    cursor: text;

    align-items: center;
    display: flex;
  }

  .search-button {
    background-color: #f15e75;
    font-weight: bold;
    width: 150px;
    padding: 12px;
    border-radius: 4px;
    border: #fff;
    font-size: 16px;

    cursor: pointer;

    &:hover {
      background-color: #f78da7;
    }
  }
`;
