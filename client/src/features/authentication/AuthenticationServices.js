import validator from 'validator';

const Service = {
  validate: (user, eml, pass, pass2) => {
    const username = Service.validateUsername(user);
    const email = Service.validateEmail(eml);
    const password = Service.validatePassword(pass);
    const password2 = Service.validatePassword2(pass, pass2);
    return { username, email, password, password2 };
  },
  validateUsername: (username) => {
    let hasError = false;
    let msg = '';

    const len = username.length;
    if (len < 3 || len > 12) {
      hasError = true;
      msg = 'Must be between 3 and 12 long';
    }

    return { hasError, msg };
  },
  validateEmail: (email) => {
    let hasError = false;
    let msg = '';

    if (!validator.isEmail(email)) {
      hasError = true;
      msg = 'Provide a valid email';
    }

    return { hasError, msg };
  },
  validatePassword: (password) => {
    let hasError = false;
    let msg = '';

    if (password.length < 3) {
      hasError = true;
      msg = 'Must be atleast 3 long';
    }

    return { hasError, msg };
  },
  validatePassword2: (password, password2) => {
    let hasError = false;
    let msg = '';

    if (password !== password2) {
      hasError = true;
      msg = 'Passwords do not match';
    }

    return { hasError, msg };
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

export default Service;
