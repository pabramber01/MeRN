import { useParams } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { UserShowPlaceholder } from '../user';
import { PublicationListPlaceholder } from '../publication';
import { Separator } from '../layout';

function Profile() {
  const UserShow = lazy(() => import('../user/userShow'));
  const PublicationList = lazy(() => import('../publication/publicationList'));
  const { username } = useParams();

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-12 col-xl-4">
          <Suspense fallback={<UserShowPlaceholder />}>
            <UserShow username={username} />
          </Suspense>
        </div>
      </div>
      <div className="row">
        <Separator color={'secondary'} cls={'mb-2'} />
      </div>
      <Suspense fallback={<PublicationListPlaceholder />}>
        <PublicationList page={`profile/${username}`} />
      </Suspense>
    </>
  );
}

export default Profile;
