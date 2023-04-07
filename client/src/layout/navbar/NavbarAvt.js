import { Avatar } from '../avatar';

function NavbarAvt({ a, u }) {
  return (
    <div className="row">
      <div className="col order-md-2 ps-2">
        <Avatar url={a} size="sm" shadow={true} />
      </div>
      <div className="col order-md-1 pe-0">
        <span>{u}</span>
      </div>
    </div>
  );
}
export default NavbarAvt;
