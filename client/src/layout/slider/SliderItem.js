import { SliderIndicators, SliderImg } from '.';

function SliderItem({ id, index, len, source, alternative, vh }) {
  return (
    <div className={`carousel-item ${index === 0 && 'active'}`}>
      <SliderIndicators id={id} index={index} len={len} />
      <SliderImg
        id={id}
        source={source}
        alternative={alternative}
        vh={vh}
        len={len}
      />
    </div>
  );
}

export default SliderItem;
