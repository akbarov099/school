import React from "react";
import { FaSearchLocation } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import user from "../../assets/images/logo.png";

const ContactInfo = () => {
  return (
    <div className="contact-hero__info">
      <img src={user} alt="User" className="contact-hero__image" />
      <>
      <h2>Каримов Ибрагим Улугбекович</h2>
      <p>Знания | Учёба | Успех</p>
      </>
      <p>
        <FaSearchLocation /> Адрес: г. Ош, ул. Мадумарова,155
      </p>
    </div>
  );
};

export default ContactInfo;
