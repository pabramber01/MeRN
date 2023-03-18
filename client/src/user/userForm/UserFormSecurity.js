import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userFormService, updatePassword, deleteUser } from '.';
import { logoutUserLocal } from '../../auth';
import { FormInput, Separator, FormSubmit } from '../../layout';

const initialValues = {
  newPass: { value: '', hasError: null, errorMsg: '' },
  newPass2: { value: '', hasError: null, errorMsg: '' },
  oldPass: { value: '', hasError: null, errorMsg: '' },
};

function UserFormSecurity() {
  const [values, setValues] = useState(initialValues);
  const { isLoading } = useSelector((store) => store.userForm);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { newPass, newPass2, oldPass } = values;

    const validation = userFormService.validatePassForm(
      newPass.value,
      newPass2.value,
      oldPass.value
    );

    setValues(validation);
    if (userFormService.checkPassFormErrors(validation)) {
      return;
    }

    dispatch(updatePassword({ oldPass: oldPass.value, newPass: newPass.value }))
      .unwrap()
      .then(() => setValues(initialValues))
      .catch(() =>
        setValues({
          ...values,
          oldPass: { value: '', hasError: null, errorMsg: '' },
        })
      );
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: { ...values[name], value } });
  };

  const handleBlur = (e) => {
    const { newPass, newPass2, oldPass } = values;
    const name = e.target.name;
    let res;

    switch (name) {
      case 'newPass':
        res = userFormService.validatePass(newPass.value);
        break;
      case 'newPass2':
        res = userFormService.confirmPass(newPass.value, newPass2.value);
        break;
      case 'oldPass':
        res = userFormService.validatePass(oldPass.value);
        break;
      default:
        res = {};
    }

    setValues({ ...values, [name]: { ...values[name], ...res } });
  };

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete your account?')) {
      dispatch(deleteUser())
        .unwrap()
        .then(() => {
          dispatch(logoutUserLocal('We hope to see you again!'));
        });
    }
  };

  return (
    <>
      <div className="updatePassword">
        <h3>Change password</h3>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <FormInput
                label="New password"
                type="password"
                name="newPass"
                value={values.newPass.value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="new password"
                hasError={values.newPass.hasError}
                errorMsg={values.newPass.errorMsg}
              />
            </div>
            <div className="col-md-6">
              <FormInput
                label="Confirm new password"
                type="password"
                name="newPass2"
                value={values.newPass2.value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="new password"
                hasError={values.newPass2.hasError}
                errorMsg={values.newPass2.errorMsg}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <FormInput
                label="Old password"
                type="password"
                name="oldPass"
                value={values.oldPass.value}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="old password"
                hasError={values.oldPass.hasError}
                errorMsg={values.oldPass.errorMsg}
              />
            </div>
          </div>
          <div className="row">
            <FormSubmit
              className="col-md-6 d-grid my-3"
              btn="primary"
              disabled={isLoading}
              text="Update password"
            />
          </div>
        </form>
      </div>
      <div className="row">
        <Separator color="secondary" cls="my-4" />
      </div>
      <div className="deleteAccount">
        <h3>Delete account</h3>
        <p className="warn-delete">
          Deleting your account is an irreversible action, thus eliminating any
          stored personal information as well as all publications.
        </p>
        <div className="row">
          <FormSubmit
            className="col-md-6 d-grid"
            btn="secondary"
            onClick={handleDelete}
            disabled={isLoading}
            text="Delete account"
          />
        </div>
      </div>
    </>
  );
}
export default UserFormSecurity;
