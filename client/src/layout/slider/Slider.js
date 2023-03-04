import { useEffect, useState } from 'react';
import { SliderWrapper, SliderItem, SliderPlaceholder } from '.';
import Carousel from 'bootstrap/js/dist/carousel';

const sliderVH = 70;

function Slider({ id, images, alt, edit }) {
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    if (imgs !== images) {
      setImgs(images);
    } else {
      new Carousel(document.getElementById(id));
    } // eslint-disable-next-line
  }, [images]);

  return imgs !== images ? (
    <SliderPlaceholder />
  ) : (
    <SliderWrapper>
      <div className="full-slider">
        <div id={id} className="carousel slide">
          <div className="carousel-inner">
            {images.map((img, i) => (
              <SliderItem
                key={i}
                id={id}
                index={i}
                len={imgs.length}
                source={img}
                alternative={alt}
                vh={sliderVH}
                edit={edit}
              />
            ))}
          </div>
        </div>
      </div>
    </SliderWrapper>
  );
}

export default Slider;
export { sliderVH };
