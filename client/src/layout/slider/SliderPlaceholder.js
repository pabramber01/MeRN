import { SliderWrapper, SliderImgPlaceholder, sliderVH } from '.';
import { TiDelete } from 'react-icons/ti';
import { Separator } from '../separator';

function SliderPlaceholder({ edit }) {
  return (
    <SliderWrapper>
      <div className="full-slider">
        <Separator />
        <div className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="container container-img">
                <SliderImgPlaceholder vh={sliderVH} />
                {edit && (
                  <div className="delete-container">
                    <TiDelete className="delete-icon" />
                    <button
                      type="button"
                      className="delete-button delete-disabled"
                    />
                  </div>
                )}
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
