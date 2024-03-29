import { useDispatch } from 'react-redux';
import { logoutUser } from '../../auth';

function NavbarLogout() {
  const dispatch = useDispatch();

  return (
    <li>
      <button
        type="button"
        onClick={() => dispatch(logoutUser())}
        className="dropdown-item"
      >
        Logout
      </button>
    </li>
  );
}

export default NavbarLogout;
