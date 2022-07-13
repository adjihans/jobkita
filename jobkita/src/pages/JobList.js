import React, { useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";

export const JobList = () => {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  return (
    <JobListContainer>
      <Navbar showBorder={true} />
      <SearchBar role={role} location={location} />
    </JobListContainer>
  );
};

export default JobList;

const JobListContainer = styled.div`
  width: 100%;
`;
