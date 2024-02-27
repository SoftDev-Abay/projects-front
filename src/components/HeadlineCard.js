import React from "react";
import "./HeadlineCard.scss";
import { useTranslation } from "react-i18next";
const HeadlineCard = ({ article }) => {
  const { t } = useTranslation("global");
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
              {t("headlines.headlineCard.author")} {article.author || "Unknown"}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              {t("headlines.headlineCard.published")}
              {new Date(article.publishedAt).toLocaleString()}
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
            {t("headlines.headlineCard.indicator")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeadlineCard;
