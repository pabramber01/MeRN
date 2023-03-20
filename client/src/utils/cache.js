const imgIsCached = (src) => {
  let res = false;

  if (src !== '') {
    const image = new Image();
    image.src = src;
    res = image.complete;
  }

  return res;
};

export { imgIsCached };
