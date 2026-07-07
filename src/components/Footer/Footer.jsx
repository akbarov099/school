import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../../assets/images/logo_column.png";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaPhoneAlt } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { SlSocialFacebook } from "react-icons/sl";
import { FaLocationDot } from "react-icons/fa6";
import { FiTwitter } from "react-icons/fi";
import { MdEmail } from "react-icons/md";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const [contact, setContact] = useState({
    phone: "",
    email: ""
  });

  const [links, setLinks] = useState({
    link_tiktok: "",
    link_instagram: "",
    link_facebook: "",
    link_twitter: "",
  });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__wrapper">
          <div className="footer__logo-section">
            <NavLink to={"/"} className="footer__logo" onClick={scrollToTop}>
              <img src={Logo} alt="School Logo" />
            </NavLink>
          </div>

          <nav className="footer__nav">
            <ul>
              <li>
                <NavLink className="header__nav-item" onClick={scrollToTop} exact to={"/"}>
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink className="header__nav-item" onClick={scrollToTop} to={"/about"}>
                  О нас
                </NavLink>
              </li>
              <li>
                <NavLink className="header__nav-item" onClick={scrollToTop} to={"/teachers"}>
                  Учителя
                </NavLink>
              </li>

              <li>
                <NavLink className="header__nav-item" onClick={scrollToTop} to={"/events"}>
                  События
                </NavLink>
              </li>
              <li>
                <NavLink className="header__nav-item" onClick={scrollToTop} to={"/contacts"}>
                  Контакты
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="footer__contact">
            <h3>Связаться</h3>
            <p>
              <FaPhoneAlt /> <strong> Телефон:</strong> (+996) 507 42-90-90
            </p>
            <p>
              <MdEmail /> <strong> Email:</strong>  admin@gmail.com
            </p>
            <p>
              <FaLocationDot /> <strong> Адрес:</strong>  Мадумарова 85 а, г.Ош
            </p>
          </div>

          <div className="footer__social-links">
            <div className="footer__icon">
              <a
                href={"https://www.instagram.com/39shkola70let/?igsh=MXIwYXFjbTN1Zms2cQ%3D%3D"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="footer__icon" />
              </a>
              <a
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiOutlineYoutube className="footer__icon" />
              </a>
            </div>
            <div className="footer__icon">
              <a
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SlSocialFacebook className="footer__icon" />
              </a>
              <a
                href={"#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiTwitter className="footer__icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};