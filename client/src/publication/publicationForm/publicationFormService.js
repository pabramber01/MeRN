const publicationFormService = {
  validate: (title, desc, images, previews) => {
    const titleErrors = publicationFormService.validateTitle(title);
    const descErrors = publicationFormService.validateDescription(desc);
    const imagesErrors = publicationFormService.validateImages(images);

    return {
      title: { value: title, ...titleErrors },
      desc: { value: desc, ...descErrors },
      images: { value: images, ...imagesErrors },
      previews,
    };
  },
  validateTitle: (title) => {
    let hasError = false;
    let errorMsg = '';

    const len = title.length;
    if (len < 3 || len > 20) {
      hasError = true;
      errorMsg = 'Must be between 3 and 20 long';
    }

    return { hasError, errorMsg };
  },
  validateDescription: (desc) => {
    let hasError = desc ? false : null;
    let errorMsg = '';

    const len = desc.length;
    if (len > 512) {
      hasError = true;
      errorMsg = 'Can not be longer than 512';
    }

    return { hasError, errorMsg };
  },
  validateImages: (images) => {
    let hasError = false;
    let errorMsg = '';

    const len = images.length;
    if (len <= 0 || len > 4) {
      hasError = true;
      errorMsg = 'There has to be between 1 and 4 pictures';
    }

    return { hasError, errorMsg };
  },
  checkErrors: (validation) => {
    return (
      validation.title.hasError ||
      validation.desc.hasError ||
      validation.images.hasError
    );
  },
};

export default publicationFormService;
