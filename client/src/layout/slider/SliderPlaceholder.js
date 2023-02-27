import { SliderWrapper, SliderImgPlaceholder, sliderVH } from '.';
import { Separator } from '../separator';

function SliderPlaceholder() {
  return (
    <SliderWrapper>
      <div className="full-slider">
        <Separator />
        <div className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container container-img">
                <SliderImgPlaceholder vh={sliderVH} />
              </div>
            </div>
          </div>
        </div>
        <Separator />
      </div>
    </SliderWrapper>
  );
}

export default SliderPlaceholder;
