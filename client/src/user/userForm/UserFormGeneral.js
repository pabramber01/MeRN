import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserData,
  UserFormGeneralPlaceholder,
  userFormService,
  updateUser,
} from '.';
import { Avatar, FormInput, FormSubmit } from '../../layout';
import { FiUploadCloud } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti';
import { loadCurrentUser } from '../../auth';

const initialValues = (user) => ({
  username: { value: user.username || '', hasError: null, errorMsg: '' },
  email: { value: user.email || '', hasError: null, errorMsg: '' },
  avatar: user.avatar || '',
  preview: user.avatar || '',
  isLoading: false,
});

function UserFormGeneral() {
  const { user } = useSelector((state) => state.userForm);
  const [values, setValues] = useState(initialValues(user));
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      dispatch(getUserData());
    } else {
      setValues(initialValues(user));
    } // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    if (typeof values.avatar === 'object') {
      const url = URL.createObjectURL(values.avatar);
      setValues({ ...values, preview: url });

      return () => URL.revokeObjectURL(url);
    } // eslint-disable-next-line
  }, [values.avatar]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, avatar, preview } = values;

    const validation = userFormService.validateGeneralForm(
      username.value,
      email.value,
      avatar,
      preview
    );

    setValues(validation);
    if (userFormService.checkGeneralFormErrors(validation)) {
      return;
    }

    const user = new FormData();
    user.append('username', username.value);
    user.append('email', email.value);
    user.append('avatar', avatar);
    setValues({ ...validation, isLoading: true });
    dispatch(updateUser(user))
      .unwrap()
      .then(() => {
        setValues({ ...validation, isLoading: false });
        dispatch(loadCurrentUser());
      })
      .catch(() => setValues({ ...validation, isLoading: false }));
  };

  const handleChange = (e) => {
    const name = e.target.name;
    if (name === 'avatar') {
      const avatar = e.target.files[0];
      setValues({ ...values, avatar });
    } else {
      const value = e.target.value;
      setValues({ ...values, [name]: { ...values[name], value } });
    }
  };

  const handleBlur = (e) => {
    const { username, email } = values;
    const name = e.target.name;
    let res;

    switch (name) {
      case 'username':
        res = userFormService.validateUsername(username.value);
        break;
      case 'email':
        res = userFormService.validateEmail(email.value);
        break;
      default:
        res = {};
    }

    setValues({ ...values, [name]: { ...values[name], ...res } });
  };

  const handleDelete = () => {
    setValues({
      ...values,
      avatar: '',
      preview: '',
    });
  };

  return !values.username.value ? (
    <UserFormGeneralPlaceholder />
  ) : (
    <div className="updateUser">
      <h3>General settings</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 order-md-2">
            <div className="avatar-container">
              <div className="avatar">
                <Avatar url={values.preview} size="lg" shadow={true} />
                <div className="delete-container">
                  <TiDelete className="delete-icon" />
                  <button
                    type="button"
                    className={`delete-button${
                      values.avatar === '' ? ' delete-disabled' : ''
                    }`}
                    onClick={values.avatar === '' ? undefined : handleDelete}
                  />
                </div>
              </div>
              <FormInput
                type="file"
                name="avatar"
                value=""
                label={
                  <>
                    <FiUploadCloud />
                    <span className="ms-2">Upload avatar</span>
                  </>
                }
                labelClass="file-input form-control"
                onChange={handleChange}
                accept="image/*"
              />
            </div>
          </div>
          <div className="col-md-6 order-md-1">
            <FormInput
              label="Username"
              type="text"
              name="username"
              value={values.username.value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="username"
              hasError={values.username.hasError}
              errorMsg={values.username.errorMsg}
            />
            <FormInput
              label="Email"
              type="text"
              name="email"
              value={values.email.value}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="email@mern.com"
              hasError={values.email.hasError}
              errorMsg={values.email.errorMsg}
            />
            <FormSubmit
              className="d-grid gap-2 my-3"
              btn="primary"
              disabled={values.isLoading}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
export default UserFormGeneral;
