import React from "react";
import styled from "styled-components";

const SearchBar = (props) => {
  return (
    <SearchBarContainer>
      <input
        className="search-bar"
        placeholder="Role..."
        value={props.role}
        onChange={(event) => props.onChangeRole(event)}
      />
      <input
        className="search-bar"
        placeholder="Location..."
        value={props.location}
        onChange={(event) => props.onChangeLocation(event)}
      />
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
