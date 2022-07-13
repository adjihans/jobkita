import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { useQuery, gql, refetch } from "@apollo/client";
import Card from "../components/Card";

const GET_JOBS = gql`
  query GetJobs {
    jobs {
      id
      title
      locationNames
      countries {
        name
      }
      cities {
        name
      }
      company {
        name
        logoUrl
      }
      tags {
        name
      }
    }
  }
`;

export const JobList = () => {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const { data, loading, error, refetch } = useQuery(GET_JOBS);

  const generateLocation = (data) => {
    if (data.locationNames) return data.locationNames;
    if (data.countries) {
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
        <Card
          key={item.id}
          logo={item.company?.logoUrl}
          name={item.company?.name}
          role={item.title}
          location={generateLocation(item)}
          tags={generateTags(item)}
        />
      );
    });
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <JobListContainer>
      <Navbar showBorder={true} backgroundColor="#fff" />
      <div className="list-container">
        <SearchBar role={role} location={location} />
        {renderJobList()}
      </div>
    </JobListContainer>
  );
};

export default JobList;

const JobListContainer = styled.div`
  width: 100%;

  .list-container {
    flex-direction: column;
    display: flex;
    align-items: center;
  }
`;
