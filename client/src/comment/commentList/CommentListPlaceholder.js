import { CommentListSinglePlaceholder } from '.';

function CommentListPlaceholder() {
  return (
    <div className="row">
      {[...Array(9).keys()].map((i) => (
        <div key={i} className="col-12">
          <CommentListSinglePlaceholder />
        </div>
      ))}
    </div>
  );
}

export default CommentListPlaceholder;
