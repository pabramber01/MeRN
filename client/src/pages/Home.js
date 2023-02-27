import { Suspense, lazy } from 'react';
import { FeedPlaceholder } from '../features';
import { Separator } from '../layout';

function Home() {
  const Feed = lazy(() => import('../features/feed'));

  return (
    <>
      <div className="row">
        <h1 className="text-center fw-bold fst-italic">Recent Publications</h1>
        <Separator color={'secondary'} cls={'mb-2'} />
      </div>
      <Suspense fallback={<FeedPlaceholder />}>
        <Feed page="home" />
      </Suspense>
    </>
  );
}

export default Home;
