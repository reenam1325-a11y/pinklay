import {Link} from 'react-router';

export function HomeBanner({
  image,
  heading,
  subheading,
  buttonText,
  buttonLink,
}) {
  if (!image) return null;

  return (
    <section className="home-banner">
      {/* Background Image */}
      <img src={image} alt={heading || 'Banner'} />

      {/* Content Overlay */}
      <div className="home-banner__content">
        {heading && <h1>{heading}</h1>}
        {subheading && <p>{subheading}</p>}

        {buttonText && buttonLink && (
        <div className="home-banner__btn">  <Link to={buttonLink} >
            {buttonText}
          </Link>
          </div>
        )}
      </div>
    </section>
  );
}
