import { Link } from 'react-router';
import { Image } from '@shopify/hydrogen';

/**
 * Props:
 * - image: Shopify Image object ya URL
 * - title: Section heading
 * - text: Description text
 * - buttonText: Optional button text
 * - buttonLink: Optional button link
 * - reverse: boolean, agar image right me aur text left me chahiye
 */
export function ImageTextSection({ image, title, text, buttonText, buttonLink, reverse }) {
  return (
    <section className={`image-text-section ${reverse ? 'reverse' : ''}`}>
      <div className="container image-text-container">
        <div className="image-wrapper">
          {typeof image === 'string' ? (
            <img src={image} alt={title || 'Section Image'} />
          ) : (
            <Image data={image} />
          )}
        </div>
        <div className="text-wrapper">
          {title && <h2>{title}</h2>}
          {text && <p>{text}</p>}
          {buttonText && buttonLink && (
            <Link className="btn" to={buttonLink}>
              {buttonText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
