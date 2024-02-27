import React from "react";
import "./HeadlineCard.scss";
const HeadlineCard = ({ article }) => {
  return (
    <div className="headline-card">
      <div className="card m-2" style={{ width: "18rem" }} key={article.title}>
        <img
          src={article.urlToImage}
          className="card-img-top"
          alt={article.title}
        />
        <div className="card-body">
          <h5 className="card-title">{article.title}</h5>
          <p className="card-text">{article.description}</p>
          <p className="card-text">
            <small className="text-muted">
              Author: {article.author || "Unknown"}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              Published: {new Date(article.publishedAt).toLocaleString()}
            </small>
          </p>
        </div>
        <div className="card-footer text-end">
          <a
            href={article.url}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeadlineCard;
