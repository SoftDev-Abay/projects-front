import { useRef, useState, useEffect } from "react";
import "./Headlines.scss";
import { headlinesCategories, headlinesCountries } from "../assets/index";
import { axiosPrivate } from "../api/axios";
import HeadlineCard from "../components/HeadlineCard";
const Headlines = () => {
  const [headlines, setHeadlines] = useState([]);

  const fetchHeadlines = async () => {
    try {
      const country = countryRef.current.value;
      const category = categoryRef.current.value;

      const response = await axiosPrivate.get(
        `/headlines?country=${country}&category=${category}`
      );

      setHeadlines(response.data.articles);
    } catch (error) {
      alert("Failed to fetch headlines");
      console.error(error);
    }
  };

  const countryRef = useRef();
  const categoryRef = useRef();

  return (
    <section className="section-headlines">
      <div className="section-headlines_header">
        <h1>Headlines</h1>
        <div className="controls">
          <div className="filter">
            <p>Filter by:</p>
            <div className="filter-items">
              <select ref={countryRef}>
                {headlinesCountries.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </select>
              <select ref={categoryRef}>
                {headlinesCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="btn btn-primary" onClick={fetchHeadlines}>
            Apply
          </button>
        </div>
      </div>

      <div className="featured-headlines_content">
        {headlines
          .filter((article) => article.title !== "[Removed]")
          .map((article) => (
            <HeadlineCard article={article} />
          ))}
      </div>
    </section>
  );
};

export default Headlines;
