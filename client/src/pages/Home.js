import { Suspense, lazy } from 'react';
import { FeedPlaceholder } from '../features';

function Home() {
  const Feed = lazy(() => import('../features/feed'));

  return (
    <>
      <div className="row">
        <h1 className="text-center fw-bold fst-italic">Recent Publications</h1>
        <hr className="border border-danger border-1 m-0 mb-2" />
      </div>
      <Suspense fallback={<FeedPlaceholder />}>
        <Feed page="home" />
      </Suspense>
    </>
  );
}

export default Home;
