import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { PublicationPlaceholder } from '../features';

function PublicationDetails() {
  const Publication = lazy(() => import('../features/publication'));
  const { id } = useParams();

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-12 col-xl-6">
          <Suspense fallback={<PublicationPlaceholder />}>
            <Publication publicationId={id} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default PublicationDetails;
