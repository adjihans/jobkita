import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { useQuery } from "@apollo/client";
import Card from "../components/Card";
import DefaultLogo from "../assets/images/default-logo.png";
import { useHistory } from "react-router";
import { GET_JOBS } from "../config/schema";

export const JobList = () => {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const { data, loading, error, refetch } = useQuery(GET_JOBS);
  const history = useHistory();

  const onClick = (data) => {
    console.log(data);
    history.push(`/job/${data.id}`, { data: data });
  };

  const generateLocation = (data) => {
    if (data.locationNames) {
      return data.locationNames;
    }
    if (data.countries.length) {
      const countries = data.countries.map((country) => country.name);
      return countries.join(" - ");
    }
    return "Location Unspecified";
  };

  const generateTags = (data) => {
    if (!data.tags || !data.tags.length) return "Tags Unspecified";
    const tags = data.tags.map((tag) => tag.name);
    return tags.join(" - ");
  };

  const renderJobList = () => {
    if (!data?.jobs || !data.jobs.length) return null;

    return data.jobs.map((item) => {
      return (
        <div key={item.id} onClick={() => onClick(item)}>
          <Card
            logo={item.company?.logoUrl || DefaultLogo}
            name={item.company?.name}
            role={item.title}
            location={generateLocation(item)}
            tags={generateTags(item)}
          />
        </div>
      );
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <JobListContainer>
      <Navbar showBorder={true} backgroundColor="#fff" />
      <div className="search-bar">
        <SearchBar role={role} location={location} />
      </div>
      <div className="list-container">{renderJobList()}</div>
    </JobListContainer>
  );
};

export default JobList;

const JobListContainer = styled.div`
  width: 100%;

  .search-bar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .list-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
  }
`;
