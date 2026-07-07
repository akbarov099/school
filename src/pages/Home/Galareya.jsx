import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import { NavLink } from "react-router-dom";
import loadingi from "../../assets/images/loading.svg";
import notfound from "../../assets/images/not-found.jpeg";

export const Galareya = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://schoolbackend-rrc4.onrender.com/api/gallery")
      .then((response) => {
        const fetchedImages = response.data.data.map((item) => item.image);
        setImages(fetchedImages);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching images");
        setLoading(false);
        console.error("Error fetching images:", error);
      });
  }, []);

  const handleImageClick = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedImage(null);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const handlePrevious = () => {
    const previousIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[previousIndex]);
    setCurrentIndex(previousIndex);
  };

  const handleKeyDown = (e) => {
    if (isOpen) {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      } else if (e.key === "Escape") {
        closeModal();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex]);

  if (loading) {
    return (
      <div className="loading">
        <img src={loadingi} alt="Загрузка" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <img src={notfound} alt="Ошибка загрузки" />
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="no-product">
        <p>На данный момент изображения отсутствуют.</p>
      </div>
    );
  }

  return (
    <section className="galareya">
      <div className="container">
        <h2>Наша галерея</h2>
        <div className="mosaic-gallery">
          {images.slice(-8).map((image, index) => (
            <div
              key={index}
              className={`mosaic-item item-${index + 1}`}
              onClick={() => handleImageClick(images.length - 8 + index)} // Adjust index for the modal
            >
              <img src={image} alt={`Gallery item ${index + 1}`} />
              <div className="overlay">
                <FaEye className="icon" />
              </div>
            </div>
          ))}
        </div>
        <NavLink to="/gallerys">
          <h3>
            Смотреть все <FaArrowRightLong />
          </h3>
        </NavLink>
      </div>

      {isOpen && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img
            className="modal-content"
            src={selectedImage}
            alt="Enlarged view"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
          >
            <MdKeyboardDoubleArrowLeft className="previous-button" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <MdKeyboardDoubleArrowRight className="next-button" />
          </button>
        </div>
      )}
    </section>
  );
};
