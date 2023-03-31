import { UserListSinglePlaceholder } from '.';

function UserListPlaceholder() {
  return (
    <div className="row">
      {[...Array(9).keys()].map((i) => (
        <div
          key={i}
          className="col-md-10 offset-md-1 col-lg-6 offset-lg-0 col-xl-4 offset-xl-0"
        >
          <UserListSinglePlaceholder />
        </div>
      ))}
    </div>
  );
}

export default UserListPlaceholder;
