import React, { useState, useEffect, useCallback } from "react";
import { FaEye } from "react-icons/fa";
import { FaCircleArrowLeft } from "react-icons/fa6";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loadingi from "../../assets/images/loading.svg";
import notfound from "../../assets/images/not-found.jpeg";

export const Gallerys = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://schoolbackend-rrc4.onrender.com/api/gallery")
      .then((response) => {
        // Access the image URLs from the response based on the new structure
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

  const handleImageClick = useCallback(
    (index) => {
      setSelectedImage(images[index]);
      setCurrentIndex(index);
      setIsOpen(true);
    },
    [images]
  );

  const closeModal = useCallback((e) => {
    if (e.target.classList.contains("modal")) {
      setIsOpen(false);
      setSelectedImage(null);
    }
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % images.length;
      setSelectedImage(images[nextIndex]);
      return nextIndex;
    });
  }, [images]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      const previousIndex = (prevIndex - 1 + images.length) % images.length;
      setSelectedImage(images[previousIndex]);
      return previousIndex;
    });
  }, [images]);

  const handleKeyDown = useCallback(
    (e) => {
      if (isOpen) {
        if (e.key === "ArrowRight") {
          handleNext();
        } else if (e.key === "ArrowLeft") {
          handlePrevious();
        } else if (e.key === "Escape") {
          setIsOpen(false);
        }
      }
    },
    [isOpen, handleNext, handlePrevious]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

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
        <button onClick={() => navigate(-1)} className="back-button">
          <FaCircleArrowLeft />
        </button>
        <p>На данный момент изображения отсутствуют.</p>
      </div>
    );
  }

  return (
    <section className="gallerys">
      <div className="gallerys__header">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaCircleArrowLeft />
        </button>
        <div className="container">
          <h2>Наша галерея</h2>
        </div>
      </div>
      <div className="container">
        <div className="mosaic-gallery">
          {images.map((image, index) => (
            <div
              key={index}
              className={`mosaic-item item-${index + 1}`}
              onClick={() => handleImageClick(index)}
            >
              <img src={image} alt={`Gallery item ${index + 1}`} />
              <div className="overlay">
                <FaEye className="icon" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="modal" onClick={closeModal}>
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
