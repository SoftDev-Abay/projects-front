import React, { useState, useEffect, useRef } from "react";
import JobBox from "../components/JobBox";
import { jobIndustry, jobLocations } from "../assets/index";
import { axiosPrivate } from "../api/axios";
import "./Jobs.scss";
const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const locationRef = useRef();
  const industryRef = useRef();

  const fetchJobs = async () => {
    try {
      const location = locationRef.current.value;
      const industry = industryRef.current.value;

      const responce = await axiosPrivate.get(
        `http://localhost:5555/jobs?geo=${location}&industry=${industry}`
      );

      setJobs(responce.data.jobs);
    } catch (error) {
      alert("Failed to fetch jobs");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <section className="section-jobs">
      <div className="section-jobs_header">
        <h1>Featured Jobs</h1>
        <div className="controls">
          <div className="filter">
            <p>Filter by:</p>
            <div className="filter-items">
              <select ref={locationRef}>
                {jobLocations.map((location) => (
                  <option key={location} value={location}>
                    {location === "" ? "Anyware" : location}
                  </option>
                ))}
              </select>
              <select ref={industryRef}>
                {jobIndustry.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry === "" ? "Any Industry" : industry}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn btn-primary" onClick={fetchJobs}>
            Apply
          </button>
        </div>
      </div>

      <div className="featured-jobs_content">
        {jobs.map((job) => (
          <JobBox
            key={job.id + job.title + job.type + job.salary + job.company}
            title={job.jobTitle}
            type={job.jobType}
            annualSalaryMin={job.annualSalaryMin}
            annualSalaryMax={job.annualSalaryMax}
            salaryCurrency={job.salaryCurrency}
            company={job.companyName}
            location={job.jobGeo}
            companyLogo={job.companyLogo}
            url={job.url}
          />
        ))}
      </div>
    </section>
  );
};

export default Jobs;
