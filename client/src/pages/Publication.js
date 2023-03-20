import { useParams } from 'react-router-dom';
import { PublicationShow } from '../publication';

function Publication() {
  const { id } = useParams();

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-md-12 col-xl-6">
          <PublicationShow publicationId={id} />
        </div>
      </div>
    </>
  );
}

export default Publication;
