import { Link } from 'react-router';
import { useEffect, useRef } from 'react';


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
  return (
    <section className="home-grid-banner container ">
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

      {/* Right Column */}
      <div className="home-grid-banner__col home-grid-banner__col--right">
        <div className="home-grid-banner__item home-grid-banner__item--right">
          <img src={rightImage} alt="Right banner" />
        </div>
        <div className="home-grid-banner__item home-grid-banner__item--right">
          <img src={rightImage1} alt="Right banner" />
        </div>
        <div className="home-grid-banner__item home-grid-banner__item--right">
          <img src={rightImage2} alt="Right banner" />
        </div>
      </div>
    </section>
  );
}
