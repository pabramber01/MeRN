import validator from 'validator';

const userFormService = {
  validateGeneralForm: (username, email, avatar, preview) => {
    const usernameErrors = userFormService.validateUsername(username);
    const emailErrors = userFormService.validateEmail(email);

    return {
      username: { value: username, ...usernameErrors },
      email: { value: email, ...emailErrors },
      avatar,
      preview,
    };
  },
  validatePassForm: (newPass, newPass2, oldPass) => {
    const newPassErrors = userFormService.validatePass(newPass);
    const newPass2Errors = userFormService.confirmPass(newPass, newPass2);
    const oldPassErrors = userFormService.validatePass(oldPass);

    return {
      newPass: { value: newPass, ...newPassErrors },
      newPass2: { value: newPass2, ...newPass2Errors },
      oldPass: { value: oldPass, ...oldPassErrors },
    };
  },
  validateUsername: (username) => {
    let hasError = false;
    let errorMsg = '';

    const len = username.length;
    if (len < 3 || len > 12) {
      hasError = true;
      errorMsg = 'Must be between 3 and 12 long';
    }

    return { hasError, errorMsg };
  },
  validateEmail: (email) => {
    let hasError = false;
    let errorMsg = '';

    if (!validator.isEmail(email)) {
      hasError = true;
      errorMsg = 'Provide a valid email';
    }

    return { hasError, errorMsg };
  },
  validatePass: (newPass) => {
    let hasError = false;
    let errorMsg = '';

    if (newPass.length < 3) {
      hasError = true;
      errorMsg = 'Must be atleast 3 long';
    }

    return { hasError, errorMsg };
  },
  confirmPass: (newPass, newPass2) => {
    let hasError = false;
    let errorMsg = '';

    if (newPass2.length < 3) {
      hasError = true;
      errorMsg = 'Must be atleast 3 long';
    }

    if (newPass !== newPass2) {
      hasError = true;
      errorMsg = 'Passwords do not match';
    }

    return { hasError, errorMsg };
  },
  checkGeneralFormErrors: (validation) => {
    return validation.username.hasError || validation.email.hasError;
  },
  checkPassFormErrors: (validation) => {
    return (
      validation.newPass.hasError ||
      validation.newPass2.hasError ||
      validation.oldPass.hasError
    );
  },
};

export default userFormService;
