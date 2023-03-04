import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { PublicationShowPlaceholder } from '../publication';

function Publication() {
  const PublicationShow = lazy(() => import('../publication/publicationShow'));
  const { id } = useParams();

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-12 col-xl-6">
          <Suspense fallback={<PublicationShowPlaceholder />}>
            <PublicationShow publicationId={id} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default Publication;
