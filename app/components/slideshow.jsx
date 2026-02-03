import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export function HomeBannerr({ slides }) {
  if (!slides || slides.length === 0) return null;

  return (
    <section className="custom-home-banner">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        loop
        className="custom-home-banner__swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="custom-home-banner__slide">
            <div className="custom-home-banner__image-wrapper">
              <img
                src={slide.image}
                alt={slide.heading || `Slide ${index + 1}`}
                className="custom-home-banner__image"
              />
            </div>

            <div className="custom-home-banner__content">
              {slide.heading && (
                <h1 className="custom-home-banner__heading">{slide.heading}</h1>
              )}
              {slide.subheading && (
                <p className="custom-home-banner__subheading">{slide.subheading}</p>
              )}
              {slide.buttonText && slide.buttonLink && (
                <div className="custom-home-banner__btn">
                  <Link
                    to={slide.buttonLink}
                    className="custom-home-banner__btn-link"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
