import { Suspense, lazy } from 'react';
import { PublicationListPlaceholder } from '../publication';
import { Separator } from '../layout';

function Home() {
  const PublicationList = lazy(() => import('../publication/publicationList'));

  return (
    <>
      <div className="row">
        <h1 className="text-center fw-bold fst-italic">Recent Publications</h1>
        <Separator color={'secondary'} cls={'mb-2'} />
      </div>
      <Suspense fallback={<PublicationListPlaceholder />}>
        <PublicationList page="home" />
      </Suspense>
    </>
  );
}

export default Home;
