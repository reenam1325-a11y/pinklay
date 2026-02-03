export function LogoSlider() {
  const logos = [
    '/logo1.jpg',
    '/logo2.jpg',
    '/logo3.jpg',
    '/logo5.jpg',
    '/logo6.jpg',
    '/logo7.jpg',
    '/logo8.jpg',
  ];

  return (
    <section className="logo-section">
      <div className="logo-track">
        hy
        {[...logos, ...logos].map((src, index) => (
          <div className="logo-item" key={index}>
            <img src={src} alt="Brand logo" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
