import { Link } from 'react-router';
import { useEffect, useState } from 'react';

export function SlideShowBanner({ banners = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === banners.length - 1 ? 0 : prev + 1
      );
    }, 4000); 

    return () => clearInterval(interval);
  }, [banners.length]);

  if (!banners.length) return null;

  const { image, heading, subheading, buttonText, buttonLink } =
    banners[activeIndex];

  return (
    <section className="home-banner">
      {/* Background Image */}
      <img src={image} alt={heading || 'Banner'} />

      {/* Content Overlay */}
      <div className="home-banner__content">
        {heading && <h1>{heading}</h1>}
        {subheading && <p>{subheading}</p>}

        {buttonText && buttonLink && (
          <div className="home-banner__btn">
            <Link to={buttonLink}>{buttonText}</Link>
          </div>
        )}
      </div>

      {/* Dots */}
      <div className="home-banner__dots">
        {banners.map((_, i) => (
          <span
            key={i}
            className={i === activeIndex ? 'active' : ''}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </section>
  );
}
