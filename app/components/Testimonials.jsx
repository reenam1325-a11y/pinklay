import { Image } from '@shopify/hydrogen';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Sachin Sharma',
      image: '/review11.avif',
      text:
        'Absolutely love this case! The fit is perfect for my iPhone 16, feels premium in hand, and gives great protection. Highly recommend!',
    },
    {
      name: 'Tasneem',
      image: '/review2.jpg',
      text:
        'The grip is amazing and the finish feels premium. Fits my Galaxy S24 Ultra perfectly without making it bulky.',
    },
    {
      name: 'Arjun',
      image: '/review3.jpg',
      text:
        'Excellent protection and feels solid. It’s a little heavier than I expected, but worth it for the safety.',
    },
    {
      name: 'Balvant Singh',
      image: '/review5.jpg',
      text:
        'The Nillkin CamShield is amazing! The sliding camera cover gives me extra peace of mind and the grip feels solid without being bulky.',
    },
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="testimonial-heading">
          “Hear from Our Happy Customers”
        </h2>

        <div className="testimonial-grid">
          {testimonials.map((item, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="testimonial-stars">
                ★★★★★
              </div>

              <h3 className="testimonial-name">{item.name}</h3>

              <p className="testimonial-text">“{item.text}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
