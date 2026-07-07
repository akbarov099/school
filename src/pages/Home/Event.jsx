import React, { useState, useEffect, useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import loadingi from "../../assets/images/loading.svg";
import notfound from "../../assets/images/not-found.jpeg";
import axios from "axios";
import eventimage from "../../assets/images/Mask.png";

export const Event = () => {
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

  const handleOutsideClick = (event) => {
    if (event.target.className === "modal") {
      closeModal();
    }
  };

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
     <div className="container">
        <div className="no-events">
          <p>На данный момент нет доступных событий.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="event">
      <div className="container">
        <div className="event__head">
          <h2>События</h2>
          <NavLink to="/events">
            <h3>
              Смотреть все <FaArrowRightLong className="event__icon" />
            </h3>
          </NavLink>
        </div>
        <div className="event__wrapper">
          {events.slice(0, 10).map((event) => (
            <div key={event.id} className="event__card">
              <img src={event.image} alt={event.title} />
              <h2>{event.title}</h2>
              <h4>
                Дата <span>{new Date(event.date).toLocaleDateString()}</span>
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
