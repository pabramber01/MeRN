const commentFormService = {
  validate: (comment) => {
    const commentErrors = commentFormService.validateComment(comment);

    return { comment: { value: comment, ...commentErrors }, isLoading: false };
  },
  validateComment: (comment) => {
    let hasError = false;
    let errorMsg = '';

    const len = comment.length;
    if (!len) {
      hasError = true;
      errorMsg = 'Provide comment';
    } else if (len > 512) {
      hasError = true;
      errorMsg = 'Can not be longer than 512';
    }

    return { hasError, errorMsg };
  },
  checkErrors: (validation) => {
    return validation.comment.hasError;
  },
};

export default commentFormService;
