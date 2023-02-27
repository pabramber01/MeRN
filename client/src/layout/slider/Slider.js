import { useEffect } from 'react';
import { SliderWrapper, SliderItem } from '.';
import { Separator } from '../separator';
import Carousel from 'bootstrap/js/dist/carousel';

const sliderVH = 70;

function Slider({ id, images, alt }) {
  const len = images.length;

  useEffect(() => {
    new Carousel(document.getElementById(id));
  }, [id]);

  return (
    <SliderWrapper>
      <div className="full-slider">
        <Separator color={'primary'} />
        <div id={id} className="carousel slide">
          <div className="carousel-inner">
            {images.map((img, i) => (
              <SliderItem
                key={i}
                id={id}
                index={i}
                len={len}
                source={img}
                alternative={alt}
                vh={sliderVH}
              />
            ))}
          </div>
        </div>
        <Separator color={'primary'} />
      </div>
    </SliderWrapper>
  );
}

export default Slider;
export { sliderVH };
