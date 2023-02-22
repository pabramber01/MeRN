import { useState } from 'react';

function SuspenseImg({ fallback, attr }) {
  const [imageState, setImageState] = useState({
    pending: true,
    load: false,
    error: false,
  });

  const handleImageLoad = () =>
    setImageState({ pending: false, load: true, error: false });

  const handleImageError = () =>
    setImageState({ pending: false, load: false, error: true });

  return imageState.error ? (
    <> {fallback} </>
  ) : (
    <>
      {imageState.pending && fallback}
      <img
        {...attr}
        className={`${attr.className} ${imageState.pending && 'd-none'}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
      />
    </>
  );
}

export default SuspenseImg;
