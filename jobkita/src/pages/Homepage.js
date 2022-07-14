import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import BackgroundImage from "../assets/images/homepage-jumbotron-background.jpg";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { GET_JOBS } from "../config/schema";
import { useQuery } from "@apollo/client";
import SearchBar from "../components/SearchBar";
import { generateLocation, generateTags } from "../util/functions";
import DefaultLogo from "../assets/images/default-logo.png";
import Skeleton from "react-loading-skeleton";

export const Homepage = () => {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [sampleData, setSampleData] = useState([]);
  const history = useHistory();
  const { data, loading, error, refetch } = useQuery(GET_JOBS);

  const onChangeInput = (event, filter) => {
    const value = event.target.value;
    if (filter === "role") {
      setRole(value);
    } else {
      setLocation(value);
    }
  };

  const onClickSearchButton = () => {
    history.push("/job", { role, location });
  };

  const onClickForMore = () => {
    history.push("/job");
  };

  const onClickCard = (data) => {
    history.push(`/job/${data.id}`, {
      jobSlug: data.slug,
      companySlug: data.company.slug,
    });
  };

  const generateLatestFourSampleData = () => {
    if (!data?.jobs || !data?.jobs.length) return;
    const tempArr = data?.jobs.slice(0, 5);
    setSampleData(tempArr);
  };

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    generateLatestFourSampleData();
  }, [data]);

  return (
    <Jumbotron>
      <Navbar />
      <div className="description-container">
        <Title>Jobkita</Title>
        <Description>Where candidate and interviewer matched</Description>
        <SearchBar
          role={role}
          location={location}
          onChangeInput={onChangeInput}
          onClickSearchButton={onClickSearchButton}
        />
      </div>
      <Title>Job Preview</Title>
      <div className="show-preview-joblist">
        {loading ? (
          <Card />
        ) : (
          <>
            {sampleData.map((item) => (
              <div key={item.id} onClick={() => onClickCard(item)}>
                <Card
                  logo={item.company?.logoUrl || DefaultLogo}
                  name={item.company?.name}
                  role={item.title}
                  location={generateLocation(item)}
                  tags={generateTags(item)}
                />
              </div>
            ))}
            <ExploreCard onClick={onClickForMore}>
              {loading ? <Skeleton /> : "Click for more"}
            </ExploreCard>
          </>
        )}
      </div>
      <div className="job-openings">
        <Title>Post Your Job</Title>
        <Description>Where candidate and interviewer matched</Description>
        <CreateJobButton>Post Your Job Openings</CreateJobButton>
      </div>
    </Jumbotron>
  );
};

export default Homepage;

const Jumbotron = styled.div`
  width: 100%;
  min-height: 100vh;
  background: white url(${BackgroundImage}) no-repeat fixed center;
  background-size: cover;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 991px) {
    align-items: center;
  }

  .description-container {
    display: flex;
    flex: 1;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }

  .show-preview-joblist {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    max-width: 75%;
    overflow: scroll;
    margin: 0 auto;
  }

  .job-openings {
    display: flex;
    flex-direction: column;
    justify: center;
    align-items: center;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 32px;
  color: #25282b;
  text-align: center;
`;

const Description = styled.div`
  font-size: 24px;
  color: #25282b;
  margin: 8px 0;
  text-align: center;
`;

const CreateJobButton = styled.button`
  width: 200px;
  height: 75px;

  margin: 16px;
  border: 1px solid #25282b;
  padding: 10px;
  font-size: 24px;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #fff;
  border-radius: 8px;

  background-color: #f15e75;
  font-weight: bold;

  &:hover {
    background-color: #f78da7;
  }
`;

const ExploreCard = styled.div`
  width: 330px;
  height: 75px;

  margin: 16px;
  border: 1px solid #25282b;
  padding: 10px;

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #fff;
  border-radius: 8px;

  background-color: #f15e75;
  font-weight: bold;

  &:hover {
    background-color: #f78da7;
  }
`;
