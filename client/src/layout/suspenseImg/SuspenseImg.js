import { useEffect, useState } from 'react';
import { objectsEqual } from '../../utils';

const initialState = {
  pending: true,
  load: false,
  error: false,
};

function SuspenseImg({ fallback, attr }) {
  const [image, setImage] = useState({ attr, state: initialState });

  useEffect(() => {
    if (!objectsEqual(image.attr, attr)) {
      setImage({ attr, state: initialState });
    } // eslint-disable-next-line
  }, [attr]);

  const handleImageLoad = () =>
    setImage({ attr, state: { pending: false, load: true, error: false } });

  const handleImageError = () =>
    setImage({ attr, state: { pending: false, load: false, error: true } });

  return !objectsEqual(image.attr, attr) || image.state.error ? (
    <> {fallback} </>
  ) : (
    <>
      {image.state.pending && fallback}
      <img
        alt=""
        {...image.attr}
        className={`${image.attr.className} ${image.state.pending && 'd-none'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  );
}

export default SuspenseImg;
