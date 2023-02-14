import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, createUser } from '../../context';
import { Wrapper, Service } from '.';
import {
  FormInput,
  FormInputError,
  LogoText,
  SpinnerButton,
} from '../../layout';

const initialValues = {
  username: '',
  email: '',
  password: '',
  password2: '',
  isMember: true,
};

const initialErrors = {
  username: { hasError: false, msg: '' },
  email: { hasError: false, msg: '' },
  password: { hasError: false, msg: '' },
  password2: { hasError: false, msg: '' },
};

function Authentication() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const { user, isLoading } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const firstRender = useRef(true);

  useEffect(() => {
    let auxControl = false;
    if (firstRender.current) {
      firstRender.current = false;
      if (user) auxControl = true;
    }
    if (user) {
      setTimeout(() => {
        if (auxControl) toast.warn('You are already logged in!');
        navigate('/');
      }, 1000);
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password, password2, isMember } = values;

    const validation = Service.validate(username, email, password, password2);

    if (isMember) {
      if (Service.checkLoginErrors(validation)) {
        toast.error('Invalid credentials');
        return;
      }

      dispatch(loginUser({ username, password }));
    } else {
      setErrors(validation);
      if (Service.checkRegisterErrors(validation)) {
        return;
      }

      dispatch(createUser({ username, email, password }));
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const handleBlur = (e) => {
    let res;

    switch (e.target.name) {
      case 'username':
        res = Service.validateUsername(values.username);
        break;
      case 'email':
        res = Service.validateEmail(values.email);
        break;
      case 'password':
        res = Service.validatePassword(values.password);
        break;
      case 'password2':
        res = Service.validatePassword2(values.password, values.password2);
        break;
      default:
        res = {};
    }

    setErrors({ ...errors, [e.target.name]: res });
  };

  const handleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
    setErrors(initialErrors);
  };

  return (
    <Wrapper>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title text-center">
            <LogoText />
          </h5>
          <hr />
          <div className="col-md-10 offset-md-1">
            <form onSubmit={handleSubmit}>
              <FormInput
                label="Username"
                type="input"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={!values.isMember && handleBlur}
                placeholder="username"
              />
              <FormInputError
                hasError={errors.username.hasError}
                msg={errors.username.msg}
              />
              {!values.isMember && (
                <>
                  <FormInput
                    label="Email"
                    type="input"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={!values.isMember && handleBlur}
                    placeholder="example@mern.es"
                  />
                  <FormInputError
                    hasError={errors.email.hasError}
                    msg={errors.email.msg}
                  />
                </>
              )}
              <FormInput
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={!values.isMember && handleBlur}
                placeholder="password"
              />
              {!values.isMember && (
                <FormInputError
                  hasError={errors.password.hasError}
                  msg={errors.password.msg}
                />
              )}
              {!values.isMember && (
                <>
                  <FormInput
                    label="Confirm password"
                    type="password"
                    name="password2"
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={!values.isMember && handleBlur}
                    placeholder="password"
                  />
                  <FormInputError
                    hasError={errors.password2.hasError}
                    msg={errors.password2.msg}
                  />
                </>
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
    </Wrapper>
  );
}

export default Authentication;
