import React, { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import teach from "../../assets/images/Учитель2.jpg";
import loadingi from "../../assets/images/loading.svg";
import notfound from "../../assets/images/not-found.jpeg";
import oops from "../../assets/images/oops.png";
import axios from "axios";

export const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://schoolbackend-rrc4.onrender.com/api/blog")
      .then((response) => {
        if (response.data.success) {
          const parsedData = response.data.data.map((event) => {
            const parsedBody = JSON.parse(event.body);
            return {
              ...event,
              image: parsedBody.image,
              date: parsedBody.date,
            };
          });
          setEvents(parsedData);
          setFilteredEvents(parsedData);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events");
        setLoading(false);
      });
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter only by title
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(query)
    );
    setFilteredEvents(filtered);
  };

  if (loading) {
    return (
      <div className="loading">
        <img src={loadingi} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <img src={notfound} alt="Error" />
        <p>{error}</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="no-events">
        <p>На данный момент нет доступных событий.</p>
      </div>
    );
  }

  return (
    <section className="school-fairs-section">
      <div className="event__search">
        <div className="container">
          <h2>Школьные События</h2>
          <div className="event__search-bar">
            <input
              type="text"
              placeholder="Поиск cобытия..."
              className="event__input"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="teachers__search-button">Поиск</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="fairs-grid">
          <div className="fairs-left">
            <h2>Школьные Ярмарки</h2>
            <p>
              Школьные ярмарки — это увлекательные события, где учащиеся могут
              продемонстрировать свои проекты и участвовать в различных
              конкурсах и мастер-классах.
            </p>
            <p>
              Эти мероприятия способствуют развитию творческого потенциала детей
              и позволяют им проявить себя в различных областях.
            </p>
          </div>
          <div className="fairs-right">
            <img src={teach} alt="Учитель" className="fairs-image" />
          </div>
        </div>
        {filteredEvents.length === 0 ? (
          <center>
            <img className="oops" src={oops} alt="не найдено" />
          </center>
        ) : (
          <div className="event__wrapper">
            {filteredEvents.map((event) => (
              <div className="event__card">
                <img src={event.image} alt="" />
                <h2>{event.title}</h2>
                <h4>
                  Дата <span>{new Date(event.date).toLocaleDateString()}</span>
                </h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
