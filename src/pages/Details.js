import React from "react";
import { useLocation } from "react-router-dom";

const Details = () => {
  const location = useLocation();
  const title = location.state.title;
  const url = location.state.url;
  const name = location.state.name;
  const postText = location.state.postText;
  return (
    <div className="detailsPage">
      <div className="detailsPost">
        <div className="mainPost"></div>
        <div className="postHeader">
          <div className="title">
            <h1>{title}</h1>
            <h6>{name}</h6>
          </div>
        </div>
        <div className="postImg">
          <img src={url} alt="" />
        </div>
        <div className="postTextContainer">{postText}</div>
      </div>
    </div>
  );
};

export default Details;
