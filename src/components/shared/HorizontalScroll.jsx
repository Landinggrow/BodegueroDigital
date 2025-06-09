import { useEffect, useRef, useState } from "react";
import siteData from "../../site.json";
import "./HorizontalScroll.css";

const HorizontalScroll = () => {
  const scrollRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(3); // Valor por defecto

  useEffect(() => {
    // Calcula cuántas veces hay que repetir las imágenes para llenar el contenedor
    const updateRepeatCount = () => {
      if (!scrollRef.current) return;
      const containerWidth = scrollRef.current.offsetWidth;
      const itemWidth = 180; // Debe coincidir con tu CSS .scroll-item width
      const images = siteData.support.images.length;
      // Queremos al menos el doble del ancho del contenedor para el efecto infinito
      const minItems = Math.ceil((containerWidth * 2) / itemWidth);
      setRepeatCount(Math.ceil(minItems / images));
    };
    updateRepeatCount();
    window.addEventListener("resize", updateRepeatCount);
    return () => window.removeEventListener("resize", updateRepeatCount);
  }, []);

  // Genera el array de imágenes repetidas
  const images = [];
  for (let i = 0; i < repeatCount; i++) {
    images.push(...siteData.support.images);
  }

  return (
    <div className="horizontal-scroll-wrapper" ref={scrollRef}>
      <div className="horizontal-scroll-content">
        {images.map((image, index) => (
          <div key={index} className="scroll-item">
            <img
              src={image.src}
              alt={image.alt || `Logo ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
