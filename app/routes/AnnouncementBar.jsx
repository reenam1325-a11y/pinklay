// export default function AnnouncementBar() {
//   return (
//     <div
//       style={{
//         backgroundColor: '#3c443f',
//         color: '#fff',
//         textAlign: 'center',
//         padding: '10px 15px',
//         fontSize: '14px',
//       }}
//     >
// FREE Global Shipping on Orders over £200 - EXPLORE NOW    </div>
//   );
// }


import { useEffect, useRef } from "react";

export default function AnnouncementBar() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let offset = 0;
    const speed = 1; // px per frame

    // duplicate text for seamless infinite scroll
    const text = marquee.innerHTML;
    marquee.innerHTML = text + "\u00A0\u00A0\u00A0" + text; 

    function scroll() {
      offset -= speed;
      if (Math.abs(offset) >= marquee.scrollWidth / 2) {
        offset = 0; // reset to start
      }
      marquee.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(scroll);
    }

    scroll();
  }, []);

  return (
    <div className="announcement-bar-wrapper">
      <div className="announcement-bar" ref={marqueeRef}>
        FREE Global Shipping on Orders over £200 - EXPLORE NOW &nbsp;&nbsp;&nbsp;
        New Arrivals – Check Out Our Latest Collection
      </div>
    </div>
  );
}

