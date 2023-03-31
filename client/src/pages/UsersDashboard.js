import { Separator } from '../layout';
import { UserList } from '../user';
import { useLocation } from 'react-router-dom';

function UsersDashboard() {
  const { pathname, search } = useLocation();
  const params = new URLSearchParams(search);

  let type = 'following';

  if (pathname.startsWith('/admin/users')) {
    type =
      params.get('q') !== null ? `admin-search/${params.get('q')}` : 'admin';
  }

  return (
    <>
      <div className="row">
        <h1 className="text-center fw-bold fst-italic">Users Dashboard</h1>
        <Separator color={'secondary'} cls={'mb-2'} />
      </div>
      <UserList page={type} />
    </>
  );
}

export default UsersDashboard;
