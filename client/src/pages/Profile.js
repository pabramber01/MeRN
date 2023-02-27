import { useParams } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { UserPlaceholder, FeedPlaceholder } from '../features';
import { Separator } from '../layout';

function Profile() {
  const User = lazy(() => import('../features/user'));
  const Feed = lazy(() => import('../features/feed'));
  const { username } = useParams();

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-12 col-xl-4">
          <Suspense fallback={<UserPlaceholder />}>
            <User username={username} />
          </Suspense>
        </div>
      </div>
      <div className="row">
        <Separator color={'secondary'} cls={'mb-2'} />
      </div>
      <Suspense fallback={<FeedPlaceholder />}>
        <Feed page={`profile/${username}`} />
      </Suspense>
    </>
  );
}

export default Profile;
