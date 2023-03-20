import { useEffect, useState } from 'react';
import { objectsEqual, imgIsCached } from '../../utils';

const initialImage = (attr) => {
  const isCached = imgIsCached(attr.src);
  const state = { pending: !isCached, load: isCached, error: false };
  return { attr, state };
};

function SuspenseImg({ fallback, attr }) {
  const [image, setImage] = useState(initialImage(attr));

  useEffect(() => {
    if (!objectsEqual(image.attr, attr)) {
      setImage(initialImage(attr));
    } // eslint-disable-next-line
  }, [attr]);

  const handleImageLoad = () =>
    setImage({ ...image, state: { pending: false, load: true, error: false } });

  const handleImageError = () =>
    setImage({ ...image, state: { pending: false, load: false, error: true } });

  return image.state.error ? (
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
