import { useParams } from 'react-router-dom';
import { PublicationShow } from '../publication';
import { CommentForm, CommentList } from '../comment';
import { Separator } from '../layout';

function Publication() {
  const { id } = useParams();

  return (
    <>
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-10 col-lg-8 col-xl-7 col-xl-7 col-xxl-6">
          <PublicationShow publicationId={id} />
          <div className="row">
            <Separator color="secondary" />
          </div>
          <CommentForm type="new" id={id} />
          <CommentList page={`getAllCommByPublication=${id}`} />
        </div>
      </div>
    </>
  );
}

export default Publication;
