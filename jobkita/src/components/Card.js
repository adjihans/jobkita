import React from "react";

const Card = (props) => {
  return (
    <div>
      <img src={props.logo} alt="logo" />
      <div>{props.name}</div>
      <div>{props.role}</div>
      <div>{props.location}</div>
      <div>{props.tags}</div>
    </div>
  );
};

export default Card;
