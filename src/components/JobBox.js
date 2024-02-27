import React from "react";
import { FaLocationDot, FaLocationPin, FaBookBookmark } from "react-icons/fa6";
import { useTranslation } from "react-i18next";
import "./JobBox.scss";

const JobBox = ({
  title,
  type,
  company,
  location,
  companyLogo,
  annualSalaryMin,
  annualSalaryMax,
  salaryCurrency,
  url,
}) => {
  // salary is a string that looks like "10000 - 20000 USD" but annualSalaryMin and annualSalaryMax can be undefined so we need to check for that and provide a default value of "N/A" if they are undefined. We can use the logical OR operator to do this. If annualSalaryMin is undefined, then the value of annualSalaryMin || "N/A" will be "N/A". If annualSalaryMin is not undefined, then the value of annualSalaryMin || "N/A" will be annualSalaryMin. We can do the same for annualSalaryMax. We can also use the logical OR operator to provide a default value of "N/A" for salaryCurrency if it is undefined. We can then use string interpolation to create the salary string. The final code will look like this:

  const { t } = useTranslation("global");
  let salary = "N/A";
  if (
    annualSalaryMin ||
    (annualSalaryMax && !(annualSalaryMin && annualSalaryMax))
  ) {
    salary = `${annualSalaryMin || annualSalaryMax} ${salaryCurrency}`;
  } else if (annualSalaryMin && annualSalaryMax) {
    salary = `${annualSalaryMin} - ${annualSalaryMax} ${salaryCurrency}`;
  }
  return (
    <>
      <div
        className={`featured-job ${location == "Anywhere" && "active"}`}
        onClick={() => {
          //  open the job in a new tab
          window.open(url, "_blank");
        }}
      >
        <header>
          <div className="title">{title}</div>
          <div className="job-info">
            <div className="type">{type}</div>
            <div className="salary">
              {t("jobs.jobCard.salary")}: {salary}
            </div>
          </div>
        </header>
        <div className="company">
          <div className="icon-wrapper">
            <img className="icon-img" src={companyLogo} alt="" />
          </div>
          <div className="company-info">
            <div className="name">{company}</div>
            <div className="location">
              <FaLocationDot className="icon" />
              <span>
                {location.split(",").length > 1
                  ? location.split(",")[0] +
                    `, ${location.split(",").length} more`
                  : location}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default JobBox;
