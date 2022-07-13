import React from "react";
import { Link } from "react-router-dom";
import { siteMap } from "../Routes";
import styled from "styled-components";

const Navbar = (props) => {
  return (
    <NavbarSticky
      showBorder={props.showBorder || false}
      backgroundColor={props.backgroundColor}
    >
      <div className="brand">Jobkita</div>
      <StyledLink to={siteMap.HomePage.path}>Home</StyledLink>
      <StyledLink to={siteMap.JobListPage.path}>Job List</StyledLink>
      <StyledLink className="create" to={siteMap.PostJobPage.path}>
        Create Job
      </StyledLink>
    </NavbarSticky>
  );
};

export default Navbar;

const NavbarSticky = styled.div`
  position: sticky;
  top: 0px;
  padding: 16px;

  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ showBorder }) => showBorder && `border-bottom: 2px solid #25282b;`}

  ${({ backgroundColor }) =>
    backgroundColor && `background-color: ${backgroundColor};`}

  color: #000000;

  .brand {
    font-size: 24px;
    font-weight: bold;
    margin-right: 24px;
    cursor: default;
  }

  .create {
    background-color: #f15e75;
    font-weight: bold;
    padding: 15px;
    border-radius: 4px;

    &:hover {
      background-color: #f78da7;
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  cursor: pointer;
  margin: 0 8px;

  &:hover {
    color: #8f8f8f;
  }
`;
