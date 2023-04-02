import { Separator } from '../layout';
import { UserList } from '../user';
import { useLocation } from 'react-router-dom';

function UsersDashboard() {
  const { pathname, search } = useLocation();
  const q = new URLSearchParams(search).get('q');

  let type;

  if (pathname.startsWith('/admin/users'))
    type = q !== null ? `admin-search/${q}` : 'admin';
  else if (pathname.startsWith('/users/myfollows'))
    type = q !== null ? `follows-search/${q}` : 'follows';

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
