import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero_img from "../../assets/images/Учитель.png";
import { FaInstagram } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

export const Hero = () => {

  return (
    <section className="hero">
      <div className="container">
        <div className="hero__wrapper">
          <div data-aos="zoom-in-right" className="hero__info">
            <h1>Образование — <i>ключ к успеху</i></h1>
            <img
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="800"
              src={Hero_img}
              alt="Учитель"
            />
            <h4>Каждый урок — шаг к достижению вашей мечты.</h4>
            <div className="hero__info-btns">
              <NavLink to={"/about"}>
                <button>
                  Узнать больше <FaArrowRightLong className="info__btn-icon1" />
                </button>
              </NavLink>
              <a
                href="https://www.instagram.com/39shkola70let/?igsh=MXIwYXFjbTN1Zms2cQ%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
                  <FaInstagram className="info__btn-icon2" /> Instagram
                </button>
              </a>
            </div>
          </div>
          <img
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="800"
            src={Hero_img}
            alt="Учитель"
          />
        </div>
      </div>
    </section>
  );
};
