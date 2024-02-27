import { useState, useEffect } from "react";
import "./Quotes.scss";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { axiosPrivate } from "../api/axios";
import { useTranslation } from "react-i18next";
const Quotes = () => {
  const [joke, setJoke] = useState("");
  const [quote, setQuote] = useState("");

  const { t } = useTranslation("global");

  const fetchJoke = async () => {
    try {
      const responce = await axiosPrivate.get("/joke");
      setJoke(responce.data);
    } catch (error) {
      alert("Failed to fetch joke");
      console.error(error);
    }
  };

  const fetchQuote = async () => {
    try {
      const responce = await axiosPrivate.get("/quote");
      setQuote(responce.data[0]);
    } catch (error) {
      alert("Failed to fetch quote");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchJoke();
    fetchQuote();
  }, []);

  return (
    <section className="section-quotes">
      <div className="section-quotes_header">
        <h1>{t("quotes.header")}</h1>
      </div>

      <div className="section-quotes_content">
        <div className="joke_card" onClick={fetchJoke}>
          <header>
            <h2>{t("quotes.jokeCard.header")}</h2>
          </header>
          <div className="body">
            <p className="setup">{joke.setup}</p>

            <p className="delivery">{joke.delivery}</p>
          </div>
          <div className="indicator">
            <p>{t("quotes.jokeCard.indicator")}</p>
          </div>
        </div>
        <div className="quote_card" onClick={fetchQuote}>
          <header>
            <FaQuoteLeft />
            <h2>{t("quotes.quoteCard.header")}</h2>
            <FaQuoteRight />
          </header>
          <div className="body">
            <p className="quote">"{quote.quote}"</p>
            <p className="author">— {quote.author}</p>
          </div>
          <div className="indicator">
            <p>{t("quotes.quoteCard.indicator")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quotes;
