import { Image } from '@shopify/hydrogen';

export function Testimonials() {
  const testimonials = [
    {
      name: 'Dipti M.',
      image: '/1review.jpg',
    
    },
    {
      name: 'Sukhneer K.',
      image: '2review.jpg',
     
    },
    {
      name: 'Ameeta K.',
      image: '/3review.jpg',
      
    },
    {
      name: 'Rachna W.',
      image: '/4review.jpg',
     
    },
     {
      name: 'Laya B.',
      image: '/5review.jpg',
     
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
 <div className="testimonial-information">
           

              <h3 className="testimonial-name">{item.name}<svg viewBox="0 0 24 24" width="16" height="16">
    <circle cx="12" cy="12" r="12" fill="#fff"></circle>
    <path d="M7 12l3 3 7-7" stroke="#000" stroke-width="2" fill="none"></path>
  </svg></h3>
   <div className="testimonial-stars">
                ★★★★★
              </div>
              <p className="testimonial-text">{item.text}</p>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
