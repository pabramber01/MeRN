import { SliderIndicators, SliderImg } from '.';
import { Separator } from '..';

function SliderItem({ id, index, len, source, alternative, vh, edit }) {
  return (
    <div className={`carousel-item ${index === 0 && 'active'}`}>
      <Separator color={'primary'} />
      <SliderIndicators id={id} index={index} len={len} />
      <SliderImg
        id={id}
        index={index}
        len={len}
        source={source}
        alternative={alternative}
        vh={vh}
        edit={edit}
      />
      <Separator color={'primary'} />
    </div>
  );
}

export default SliderItem;
