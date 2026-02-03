export function IconList() {
  const items = [
    {
      icon: '/logo1.webp',
      text: 'Free Shipping Nationwide',
    },
    {
      icon: '/logo2.png',
      text: 'Customer service',
    },
    {
      icon: '/logo3.png',
      text: '24/7 Support',
    },
    {
      icon: '/logo4.png',
      text: 'Return/Exchange Policy',
    },
  ];

  return (
    <section className="icon-list">
      <div className="container icon-list-grid">
        {items.map((item, index) => (
          <div className="icon-list-item" key={index}>
            <img src={item.icon} alt={item.text} />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
