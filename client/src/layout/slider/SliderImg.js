import { SuspenseImg } from '../suspenseImg';
import SliderImgPlaceholder from './SliderImgPlaceholder';

function SliderImg({ id, source, alternative, vh, len }) {
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
    </div>
  );
}

export default SliderImg;
