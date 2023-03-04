import { SuspenseImg } from '../suspenseImg';
import { TiDelete } from 'react-icons/ti';
import { SliderImgPlaceholder } from '.';

function SliderImg({ id, index, len, source, alternative, vh, edit }) {
  return (
    <div className="container container-img">
      <SuspenseImg
        fallback={<SliderImgPlaceholder vh={vh} />}
        attr={{
          src: source,
          className: `slider-img vh-${vh}`,
          alt: alternative,
        }}
      />
      {len > 1 && (
        <>
          <button
            className="carousel-control-prev"
            data-bs-target={`#${id}`}
            data-bs-slide="prev"
          />
          <button
            className="carousel-control-next"
            data-bs-target={`#${id}`}
            data-bs-slide="next"
          />
        </>
      )}
      {edit && (
        <div className="delete-container">
          <TiDelete className="delete-icon" />
          <button
            id={index}
            type="button"
            className={`delete-button${
              len === 1 && source === '' ? ' delete-disabled' : ''
            }`}
            onClick={len === 1 && source === '' ? undefined : edit}
          />
        </div>
      )}
    </div>
  );
}

export default SliderImg;
