import React, { useState, useEffect } from "react";
import axios from "axios";

export const ContactReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://schoolbackend-rrc4.onrender.com/api/contact").then((response) => {
      if (response.data.success) {
        setReviews(response.data.data); 
      } else {
        setError("Ошибка при получении отзывов"); 
      }
    });
  }, []);

  useEffect(() => {
    const reviewSection = document.querySelector(".contact-hero__reviews");
    reviewSection.scrollTo({
      top: 0, 
      behavior: "smooth",
    });
  }, [reviews]);

  return (
    <div className="contact-review">
      <h3>Отзывы</h3>
      <div className="contact-hero__reviews">
        {error ? (
          <p>{error}</p> 
        ) : reviews.length > 0 ? (
          reviews
            .slice()
            .reverse() 
            .map((review) => (
              <blockquote key={review._id}>
                <p>"{review.message}"</p>
                <cite>– {review.name}</cite>
              </blockquote>
            ))
        ) : (
          <p>Отзывы отсутствуют.</p> 
        )}
      </div>
    </div>
  );
};
