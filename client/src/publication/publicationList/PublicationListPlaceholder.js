import { PublicationListSinglePlaceholder } from '.';

function PublicationListPlaceholder() {
  return (
    <div className="row">
      {[...Array(9).keys()].map((i) => (
        <div key={i} className="col-md-10 offset-md-1 col-lg-4 offset-lg-0">
          <PublicationListSinglePlaceholder />
        </div>
      ))}
    </div>
  );
}

export default PublicationListPlaceholder;
