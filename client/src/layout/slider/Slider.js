import { useEffect, useState } from 'react';
import { SliderWrapper, SliderItem, SliderPlaceholder } from '.';
import { arraysEqual } from '../../utils';
import Carousel from 'bootstrap/js/dist/carousel';

const sliderVH = 70;

function Slider({ id, images, alt, edit }) {
  const [imgs, setImgs] = useState(images);

  const areImgsEqual = arraysEqual(imgs, images);

  useEffect(() => {
    if (!areImgsEqual) {
      setImgs(images);
    } // eslint-disable-next-line
  }, [images]);

  useEffect(() => {
    try {
      new Carousel(`#${id}`);
    } catch (e) {
      console.log(e);
    } // eslint-disable-next-line
  }, [imgs]);

  return !areImgsEqual ? (
    <SliderPlaceholder edit="true" />
  ) : (
    <SliderWrapper>
      <div className="full-slider">
        <div id={id} className="carousel slide">
          <div className="carousel-inner">
            {imgs.map((img, i) => (
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
