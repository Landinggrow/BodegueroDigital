import siteData from "../../site.json";
import "./HorizontalScroll.css";

const HorizontalScroll = () => {
  return (
    <div className="horizontal-scroll-wrapper rounded-3xl">
      <div className="horizontal-scroll-content bg-[#F9FBFC]">
        {siteData.support.images.map((image, index) => (
          <div key={index} className="scroll-item">
            <img
              src={image.src}
              alt={image.alt || `Logo ${index + 1}`}
              loading="lazy"
            />
          </div>
        ))}
        {/* Duplicamos las imágenes para el efecto infinito */}
        {siteData.support.images.map((image, index) => (
          <div key={`clone-${index}`} className="scroll-item">
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
