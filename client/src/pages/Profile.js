import { useParams } from 'react-router-dom';
import { UserShow } from '../user';
import { PublicationList } from '../publication';
import { Separator } from '../layout';

function Profile() {
  const { username } = useParams();

  return (
    <>
      <div className="row justify-content-center position-relative">
        <div className="col-md-12 col-xl-4">
          <UserShow username={username} />
        </div>
      </div>
      <div className="row">
        <Separator color={'secondary'} cls={'mb-2'} />
      </div>
      <PublicationList page={`profile/${username}`} />
    </>
  );
}

export default Profile;
