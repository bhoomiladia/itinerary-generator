// Slideshow.js
import Slider from "react-slick";

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    arrows: false,
    pauseOnHover: false,
  };

  const images = [
    "/slide1.jpg",
    "/slide2.jpg",
    "/slide3.jpg",
  ];

  return (
    <Slider {...settings} className="h-full">
      {images.map((src, index) => (
        <div key={index} className="h-screen w-full">
          <img
            src={src}
            alt={`Slide ${index}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </Slider>
  );
};

export default Slideshow;
