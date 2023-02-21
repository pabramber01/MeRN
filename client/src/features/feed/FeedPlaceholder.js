import { FeedSinglePlaceholder } from '.';

function FeedPlaceholder() {
  return (
    <div className="row">
      {[...Array(9).keys()].map((i) => (
        <div key={i} className="col-md-10 offset-md-1 col-lg-4 offset-lg-0">
          <FeedSinglePlaceholder />
        </div>
      ))}
    </div>
  );
}

export default FeedPlaceholder;
