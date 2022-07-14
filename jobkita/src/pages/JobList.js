import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import SearchBar from "../components/SearchBar";
import { useQuery } from "@apollo/client";
import Card from "../components/Card";
import DefaultLogo from "../assets/images/default-logo.png";
import { useHistory, useLocation } from "react-router";
import { GET_JOBS } from "../config/schema";
import { generateLocation, generateTags } from "../util/functions";

export const JobList = () => {
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tags, setTags] = useState("");
  const [mappedData, setMappedData] = useState([]);
  const [isAscending, setIsAscending] = useState(false);
  const { data, loading, error, refetch } = useQuery(GET_JOBS);
  const history = useHistory();
  const { state } = useLocation();

  const onClick = (data) => {
    history.push(`/job/${data.id}`, {
      jobSlug: data.slug,
      companySlug: data.company.slug,
    });
  };

  const onClickSearchButton = () => {
    let result = [...data.jobs];
    const getStateLocation = location ? location : state.location;
    const getStateRole = role ? role : state.role;
    if (getStateLocation) {
      result = result.filter(
        (data) =>
          data?.locationNames
            ?.toLowerCase()
            .includes(getStateLocation.toLowerCase()) ||
          data.countries
            .map((country) => country.name)
            .some((countryName) =>
              countryName
                ?.toLowerCase()
                .includes(getStateLocation.toLowerCase())
            )
      );
    }
    if (getStateRole) {
      result = result.filter((data) =>
        data.title.toLowerCase().includes(getStateRole.toLowerCase())
      );
    }
    if (companyName) {
      result = result.filter((data) =>
        data.company.name.toLowerCase().includes(companyName.toLowerCase())
      );
    }
    if (tags) {
      result = result?.filter((data) =>
        data.tags
          .map((tag) => tag.name)
          .some((tagName) => tagName.toLowerCase().includes(tags.toLowerCase()))
      );
    }
    setMappedData(result);
  };

  const onChangeInput = (event, filter) => {
    const value = event.target.value;
    switch (filter) {
      case "location":
        setLocation(value);
        break;
      case "companyName":
        setCompanyName(value);
        break;
      case "tags":
        setTags(value);
        break;
      default:
        setRole(value);
    }
  };

  const onClickSortBy = () => {
    const tempData = [...mappedData];
    if (!isAscending) {
      tempData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else {
      tempData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setIsAscending(!isAscending);
    setMappedData(tempData);
  };

  const renderJobList = () => {
    return mappedData?.map((item) => {
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
    if (state?.role) {
      setRole(state.role);
    }
    if (state?.location) {
      setLocation(location);
    }
  }, []);

  useEffect(() => {
    if (!data?.jobs || !data?.jobs.length) return;
    const tempData = [...data.jobs];
    if (state?.location || state?.role) {
      onClickSearchButton();
    } else {
      setMappedData(tempData);
    }
  }, [data]);

  return (
    <JobListContainer>
      <Navbar showBorder={true} backgroundColor="#fff" />
      <div className="search-bar">
        <SearchBar
          role={role}
          location={location}
          companyName={companyName}
          tags={tags}
          isAscending={isAscending}
          onChangeInput={onChangeInput}
          onClickSearchButton={onClickSearchButton}
          onClickSortBy={onClickSortBy}
        />
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
