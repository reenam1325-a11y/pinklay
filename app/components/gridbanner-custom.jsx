// import { Link } from 'react-router';
// import { useEffect, useRef } from 'react';


// export function HomeGridBanner({
//   leftTop,
//   leftBottom,
//   middleTop,
//   middleBottom,
//   rightImage,
//   rightImage1,
//   rightImage2,
//   heading,
//   subheading,
//   buttonText,
//   buttonLink,
// }) {
//   return (
//     <section className="home-grid-banner container ">
//       {/* Left Column */}
//       <div className="home-grid-banner__col home-grid-banner__col--left">
//         <div className="home-grid-banner__item home-grid-banner__item--left-top">
//           <img src={leftTop} alt="Left top banner" />
//         </div>
//         <div className="home-grid-banner__item home-grid-banner__item--left-bottom">
//           <img src={leftBottom} alt="Left bottom banner" />
//         </div>
//       </div>

//       {/* Middle Column */}
//       <div className="home-grid-banner__col home-grid-banner__col--middle">
//         <div className="home-grid-banner__item home-grid-banner__item--middle-top">
//           <img src={middleTop} alt="Middle top banner" />
//         </div>
//         <div className="home-grid-banner__item home-grid-banner__item--middle-bottom">
//           <img src={middleBottom} alt="Middle bottom banner" />
//         </div>
//       </div>

//       {/* Right Column */}
//       <div className="home-grid-banner__col home-grid-banner__col--right">
//         <div className="home-grid-banner__item home-grid-banner__item--right">
//           <img src={rightImage} alt="Right banner" />
//         </div>
//         <div className="home-grid-banner__item home-grid-banner__item--right">
//           <img src={rightImage1} alt="Right banner" />
//         </div>
//         <div className="home-grid-banner__item home-grid-banner__item--right">
//           <img src={rightImage2} alt="Right banner" />
//         </div>
//       </div>
//     </section>
//   );
// }
import { Link } from 'react-router';
import { useEffect, useState } from 'react';

export function HomeGridBanner({
  leftTop,
  leftBottom,
  middleTop,
  middleBottom,
  rightImage,
  rightImage1,
  rightImage2,
  heading,
  subheading,
  buttonText,
  buttonLink,
}) {
  const images = [rightImage, rightImage1, rightImage2];
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
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="home-grid-banner container">
      {/* Left Column */}
      <div className="home-grid-banner__col home-grid-banner__col--left">
        <div className="home-grid-banner__item home-grid-banner__item--left-top">
          <img src={leftTop} alt="Left top banner" />
        </div>
        <div className="home-grid-banner__item home-grid-banner__item--left-bottom">
          <img src={leftBottom} alt="Left bottom banner" />
        </div>
      </div>

      {/* Middle Column */}
      <div className="home-grid-banner__col home-grid-banner__col--middle">
        <div className="home-grid-banner__item home-grid-banner__item--middle-top">
          <img src={middleTop} alt="Middle top banner" />
        </div>
        <div className="home-grid-banner__item home-grid-banner__item--middle-bottom">
          <img src={middleBottom} alt="Middle bottom banner" />
        </div>
      </div>

      {/* Right Column – Custom Slider */}
      <div className="home-grid-banner__col home-grid-banner__col--right">
        <div className="custom-right-slider">
          {images.map((img, index) => (
            <div
              key={index}
              className={`home-grid-banner__item home-grid-banner__item--right ${
                activeIndex === index ? 'is-active' : ''
              }`}
            >
              <img src={img} alt="Right banner" />
            </div>
          ))}
          
          {/* Arrow Buttons */}
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

          {/* Dot Indicators */}
          <div className="slider-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${activeIndex === index ? 'is-active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
