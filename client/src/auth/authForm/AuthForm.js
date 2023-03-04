import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AuthFormWrapper, authFormService, loginUser, createUser } from '.';
import { FormInput, LogoText, SpinnerButton } from '../../layout';

const initialValues = {
  username: { value: '', hasError: null, errorMsg: '' },
  email: { value: '', hasError: null, errorMsg: '' },
  password: { value: '', hasError: null, errorMsg: '' },
  password2: { value: '', hasError: null, errorMsg: '' },
  isMember: true,
};

function AuthForm() {
  const [values, setValues] = useState(initialValues);
  const { currentUser, isLoading } = useSelector((store) => store.authForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstRender = useRef(true);

  useEffect(() => {
    let auxControl = false;
    if (firstRender.current) {
      firstRender.current = false;
      if (currentUser) auxControl = true;
    }
    if (currentUser) {
      setTimeout(() => {
        if (auxControl) toast.warn('You are already logged in!');
        navigate('/');
      }, 1000);
    } // eslint-disable-next-line
  }, [currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2, isMember } = values;

    const validation = authFormService.validate(
      username.value,
      email.value,
      password.value,
      password2.value,
      isMember
    );

    if (isMember) {
      if (authFormService.checkLoginErrors(validation)) {
        toast.error('Invalid credentials');
        return;
      }

      dispatch(
        loginUser({
          username: username.value,
          password: password.value,
        })
      );
    } else {
      setValues(validation);
      if (authFormService.checkRegisterErrors(validation)) {
        return;
      }

      dispatch(
        createUser({
          username: username.value,
          email: email.value,
          password: password.value,
        })
      );
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: { ...values[name], value } });
  };

  const handleBlur = (e) => {
    const { username, email, password, password2, isMember } = values;
    const name = e.target.name;
    let res;

    switch (name) {
      case 'username':
        res = authFormService.validateUsername(username.value);
        break;
      case 'email':
        res = authFormService.validateEmail(email.value);
        break;
      case 'password':
        res = authFormService.validatePassword(password.value, isMember);
        break;
      case 'password2':
        res = authFormService.validatePassword2(
          password.value,
          password2.value
        );
        break;
      default:
        res = {};
    }

    setValues({ ...values, [name]: { ...values[name], ...res } });
  };

  const handleMember = () => {
    setValues({ ...initialValues, isMember: !values.isMember });
  };

  return (
    <AuthFormWrapper>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">
            <LogoText />
          </h5>
          <hr />
          <div className="col-10 offset-1">
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Username"
                type="input"
                name="username"
                value={values.username.value}
                onChange={handleChange}
                onBlur={!values.isMember && handleBlur}
                placeholder="username"
                hasError={values.username.hasError}
                errorMsg={values.username.errorMsg}
              />
              {!values.isMember && (
                <FormInput
                  label="Email"
                  type="input"
                  name="email"
                  value={values.email.value}
                  onChange={handleChange}
                  onBlur={!values.isMember && handleBlur}
                  placeholder="example@mern.es"
                  hasError={values.email.hasError}
                  errorMsg={values.email.errorMsg}
                />
              )}
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={values.password.value}
                onChange={handleChange}
                onBlur={!values.isMember && handleBlur}
                placeholder="password"
                hasError={values.password.hasError}
                errorMsg={values.password.errorMsg}
              />
              {!values.isMember && (
                <FormInput
                  label="Confirm password"
                  type="password"
                  name="password2"
                  value={values.password2.value}
                  onChange={handleChange}
                  onBlur={!values.isMember && handleBlur}
                  placeholder="password"
                  hasError={values.password2.hasError}
                  errorMsg={values.password2.errorMsg}
                />
              )}
              <div className="d-grid gap-2 my-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? <SpinnerButton /> : 'Submit'}
                </button>
              </div>
            </form>
          </div>
          <hr />
          <div className="col-md-10 offset-md-1 text-center">
            <span className="span-member">
              {values.isMember ? "Don't have an account?" : 'Have an account?'}
            </span>
            <button
              type="button"
              onClick={handleMember}
              className="btn btn-link p-0"
            >
              {values.isMember ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </AuthFormWrapper>
  );
}

export default AuthForm;
