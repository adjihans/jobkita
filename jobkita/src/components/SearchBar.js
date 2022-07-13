import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { siteMap } from "../Routes";

const SearchBar = (props) => {
  const { pathname } = useLocation();

  const isJobListPage = pathname === siteMap.JobListPage.path;

  return (
    <SearchBarContainer>
      <input
        className="search-bar"
        placeholder="Role..."
        value={props.role}
        onChange={(event) => props.onChangeInput(event, "role")}
      />
      <input
        className="search-bar"
        placeholder="Location..."
        value={props.location}
        onChange={(event) => props.onChangeInput(event, "location")}
      />
      {isJobListPage && (
        <>
          <input
            className="search-bar"
            placeholder="Company..."
            value={props.companyName}
            onChange={(event) => props.onChangeInput(event, "companyName")}
          />
          <input
            className="search-bar"
            placeholder="Tags..."
            value={props.Tags}
            onChange={(event) => props.onChangeInput(event, "tags")}
          />
          <button className="search-button" onClick={props.onClickSortBy}>
            {props.isAscending ? "Asc" : "Desc"}
          </button>
        </>
      )}
      <button className="search-button" onClick={props.onClickSearchButton}>
        Search
      </button>
    </SearchBarContainer>
  );
};

export default SearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
  .search-bar {
    background-color: #ffffff;
    height: 15px;
    width: 250px;
    padding: 12px;
    margin: 0 16px;

    border-radius: 4px;
    font-size: 16px;

    cursor: text;

    align-items: center;
    display: flex;
  }

  .search-button {
    background-color: #f15e75;
    font-weight: bold;
    width: 75px;
    padding: 12px;
    border-radius: 4px;
    border: #fff;
    margin: 0 8px;
    font-size: 16px;

    cursor: pointer;

    &:hover {
      background-color: #f78da7;
    }
  }
`;
