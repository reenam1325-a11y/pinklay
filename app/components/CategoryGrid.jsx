import { useEffect, useState } from "react";

export default function CategoryGrid({
  rightImage,
  rightImage1,
  rightImage2,
}) {
  const images = [rightImage, rightImage1, rightImage2].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <section className="home-grid-banner home-grid-banner-category container">
      <div className="home-grid-banner__col home-grid-banner__col--right">
        <div className="custom-right-slider">
          {images.map((img, index) => (
            <div
              key={index}
              className={`home-grid-banner__item home-grid-banner__item--right ${
                activeIndex === index ? "is-active" : ""
              }`}
            >
              <img src={img} alt={`Slide ${index + 1}`} />
            </div>
          ))}

          {images.length > 1 && (
            <>
              {/* Arrows */}
              <button
                className="slider-arrow slider-arrow--prev"
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                ❮
              </button>

              <button
                className="slider-arrow slider-arrow--next"
                onClick={handleNext}
                aria-label="Next slide"
              >
                ❯
              </button>

              {/* Dots */}
              <div className="slider-dots">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`slider-dot ${
                      activeIndex === index ? "is-active" : ""
                    }`}
                    onClick={() => handleDotClick(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}