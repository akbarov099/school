import React, { useState, useEffect } from "react";
import axios from "axios";
import { GrContactInfo } from "react-icons/gr";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import loadingi from "../../assets/images/loading.svg";
import notfound from "../../assets/images/not-found.jpeg";
import oops from "../../assets/images/oops.png";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};

export const Personal = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://schoolbackend-rrc4.onrender.com/api/teachers")
      .then((response) => {
        if (response.data.success) {
          setTeachers(response.data.data);
          setFilteredTeachers(
            response.data.data.filter((teacher) => teacher.type === "Teacher")
          );
        } else {
          setError("Ошибка при загрузке данных. Попробуйте позже.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Ошибка при загрузке данных. Попробуйте позже.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = teachers.filter(
      (teacher) =>
        teacher.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
        teacher.type === "Personal"
    );
    setFilteredTeachers(filtered);
  }, [searchTerm, teachers]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      setSearchTerm(event.target.value);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <img src={loadingi} alt="Загрузка..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <img src={notfound} alt="Ошибка при загрузке" />
      </div>
    );
  }

  return (
    <section className="personal">
      <div className="container">
        <div className="personal__head">
          <h2>Познакомьтесь с нашим персоналом</h2>
          <NavLink to="/teachers" onClick={scrollToTop}>
            <h3>
              Учителя <FaArrowRightLong className="personal__icon" />
            </h3>
          </NavLink>
        </div>
        <div className="personal__list">
          {filteredTeachers.length > 0 ? (
            filteredTeachers.map((teach) => (
              <div key={teach._id || teach.id} className="personal__card">
                <div
                  className="personal__image"
                  onClick={() => {
                    if (teach.resume) {
                      window.open(teach.resume, "_blank");
                    } else {
                      alert("PDF файл не найден.");
                    }
                  }}
                >
                  <img
                    src={teach.image || require("../../assets/images/default-image.jpg")}
                    alt={teach.full_name}
                  />
                  <GrContactInfo className="whatsapp-icon" size={40} />
                </div>
                <div className="personal__info">
                  <h3>{teach.full_name}</h3>
                  <p>{teach.subject}</p>
                </div>
              </div>
            ))
          ) : searchTerm ? (
            <img className="oops" src={oops} alt="не найден" />
          ) : (
            <div className="no-product">
              <p>На данный момент нет доступных учителей.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
