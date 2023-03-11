const publicationService = {
  validateImagesLen: (imgArray) => {
    const len = imgArray.length;
    return len >= 1 && len <= 4;
  },
};

export default publicationService;
