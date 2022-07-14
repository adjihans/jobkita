import React from "react";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const Card = (props) => {
  return (
    <CardContainer>
      <div className="card-header-container">
        <div className="card-data-container image">
          {props.logo ? <img src={props.logo} alt="logo" /> : <Skeleton />}
        </div>
        <div className="card-data-container info">
          <div className="text">{props.name || <Skeleton />}</div>
          <div className="text">{props.role || <Skeleton />}</div>
          {props.location && (
            <div className="text">{props.location || <Skeleton />}</div>
          )}
        </div>
      </div>
      <div className="card-footer-container">{props.tags || <Skeleton />}</div>
    </CardContainer>
  );
};

export default Card;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  width: 330px;
  height: 250px;
  max-width: 330px;
  max-height: 250px;

  margin: 16px;
  border: 1px solid #25282b;
  padding: 10px;

  cursor: pointer;

  background-color: #fff;
  border-radius: 8px;

  .card-header-container {
    display: flex;
    margin: 8px;
    flex-direction: row;
    justify-content: space-evenly;
    width: 100%;
    height: 75%;

    .card-data-container {
      display: flex;
      flex-direction: column;
      margin: 8px;

      .text {
        color: #25282b;
        margin: 4px 0;
      }
    }
    .info {
      justify-content: flex-start;
      flex: 1;
    }

    .image {
      justify-content: center;
      max-width: 150px;
      max-height: 150px;
      object-fit: cover;
    }
  }

  .card-footer-container {
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    color: #25282b;
    height: 25%;
    width: 100%;
  }
`;
