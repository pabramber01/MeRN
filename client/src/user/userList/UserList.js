import { useSelector } from 'react-redux';
import {
  getAll,
  changeView,
  UserListSingle,
  UserListPlaceholder,
  UserListWrapper,
} from '.';
import { Spinner, EmptyData, FormInput, FormSubmit } from '../../layout';
import { useFetchInfiniteScroll, useControlInfiniteScroll } from '../../hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  search: '',
};

function UserList({ page }) {
  const [values, setValues] = useState(initialValues);
  const { data, view, reachEnd } = useSelector((store) => store.userList);
  const navigate = useNavigate();

  useFetchInfiniteScroll(getAll, changeView, data, reachEnd, view, page);
  useControlInfiniteScroll(getAll, page, reachEnd);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { search } = values;

    navigate(`/admin/users?q=${search}`);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-10 offset-md-1 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4 d-flex justify-content-center">
          <UserListWrapper className="fit-content">
            <form onSubmit={handleSubmit} className="search-form">
              <FormInput
                type="input"
                name="search"
                value={values.search}
                onChange={handleChange}
                placeholder="Search user..."
              />
              <FormSubmit btn="primary ms-1" disabled={false} />
            </form>
          </UserListWrapper>
        </div>
      </div>
      {view !== page || (data.length === 0 && !reachEnd) ? (
        page.startsWith('admin-search') ? (
          <Spinner color="secondary" centered={true} />
        ) : (
          <UserListPlaceholder />
        )
      ) : data.length > 0 ? (
        <div className="row">
          {data.map((user) => (
            <div
              key={user._id}
              className="col-md-10 offset-md-1 col-lg-6 offset-lg-0 col-xl-4 offset-xl-0"
            >
              <UserListSingle data={user} />
            </div>
          ))}
          {!reachEnd && (
            <Spinner centered={true} color="secondary" extraClass={'my-3'} />
          )}
        </div>
      ) : (
        <EmptyData />
      )}
    </>
  );
}

export default UserList;
