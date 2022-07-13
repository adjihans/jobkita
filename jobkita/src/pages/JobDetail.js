import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import DefaultLogo from "../assets/images/default-logo.png";
import { useQuery } from "@apollo/client";
import { GET_JOB } from "../config/schema";

export const JobDetail = () => {
  const { state } = useLocation();

  const { data, refetch } = useQuery(GET_JOB, {
    variables: {
      input: {
        jobSlug: state.jobSlug,
        companySlug: state.companySlug,
      },
    },
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <JobDetailContainer>
      <Navbar showBorder={true} backgroundColor="#fff" />
      <div className="information">
        <Header>
          <div className="info">
            <img
              className="company-logo"
              src={data?.job?.company.logoUrl || DefaultLogo}
            />
            <p>{data?.job?.company.name} is hiring a</p>
          </div>
          <div className="apply">
            <a className="ref" href={data?.job?.applyUrl}>
              Apply
            </a>
          </div>
        </Header>
        <Title>{data?.job?.title}</Title>
        <b>Description:</b>
        <Description>{data?.job?.description}</Description>
        <Footer>
          <div className="bold">Tags:</div>
          <div>{data?.job?.tags?.map((tag) => tag.name).join(" - ")}</div>
          <div className="bold">Posted:</div>
          <div>{new Date(data?.job?.postedAt).toString()}</div>
        </Footer>
        <div className="apply">
          <a className="ref" href={data?.job?.applyUrl}>
            Apply
          </a>
        </div>
      </div>
    </JobDetailContainer>
  );
};

export default JobDetail;

const JobDetailContainer = styled.div`
  width: 100%;

  .information {
    padding: 16px;
    display: flex;
    flex-direction: column;
  }

  .apply {
    background-color: #f15e75;
    font-weight: bold;
    width: 60px;
    padding: 12px;
    border-radius: 4px;
    border: #fff;
    font-size: 16px;
    text-align: center;
    cursor: pointer;

    &:hover {
      background-color: #f78da7;
    }

    .ref {
      text-decoration: none;
      color: #25282b;
    }
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .info {
    display: flex;
    flex-direction: row;
  }

  .company-logo {
    height: 50px;
    width: 50px;
    max-height: 50px;
    max-width: 50px;
    object-fit: cover;
    margin-right: 8px;
  }
`;

const Title = styled.div`
  color: #25282b;
  font-weight: bold;
  font-size: 50px;
  margin: 8px 0;
`;

const Description = styled.div`
  color: #25282b;
  font-size: 24px;
  margin: 8px 0;
`;

const Footer = styled.div`
  color: #25282b;
  font-size: 16px;
  margin: 8px 0;

  .bold {
    font-weight: bold;
  }
`;
