import validator from 'validator';

const authFormService = {
  validate: (username, email, password, password2, isMember) => {
    const usernameErrors = authFormService.validateUsername(username);
    const emailErrors = authFormService.validateEmail(email);
    const passwordErrors = authFormService.validatePassword(password);
    const password2Errors = authFormService.validatePassword2(
      password,
      password2
    );

    return {
      username: { value: username, ...usernameErrors },
      email: { value: email, ...emailErrors },
      password: { value: password, ...passwordErrors },
      password2: { value: password2, ...password2Errors },
      isMember,
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
  validatePassword: (password) => {
    let hasError = false;
    let errorMsg = '';

    if (password.length < 3) {
      hasError = true;
      errorMsg = 'Must be atleast 3 long';
    }

    return { hasError, errorMsg };
  },
  validatePassword2: (password, password2) => {
    let hasError = false;
    let errorMsg = '';

    if (password2.length < 3) {
      hasError = true;
      errorMsg = 'Must be atleast 3 long';
    }

    if (password !== password2) {
      hasError = true;
      errorMsg = 'Passwords do not match';
    }

    return { hasError, errorMsg };
  },
  checkLoginErrors: (validation) => {
    return validation.username.hasError || validation.password.hasError;
  },
  checkRegisterErrors: (validation) => {
    return (
      validation.username.hasError ||
      validation.email.hasError ||
      validation.password.hasError ||
      validation.password2.hasError
    );
  },
};

export default authFormService;
