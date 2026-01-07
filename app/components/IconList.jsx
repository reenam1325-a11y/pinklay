export function IconList() {
  const items = [
    {
      icon: '/icons/free-shipping.svg',
      text: 'Free Shipping Nationwide',
    },
    {
      icon: '/icons/customer-service.svg',
      text: 'Customer service',
    },
    {
      icon: '/icons/support.svg',
      text: '24/7 Support',
    },
    {
      icon: '/icons/return.svg',
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
