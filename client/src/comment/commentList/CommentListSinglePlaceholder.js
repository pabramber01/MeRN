import { CommentListWrapper } from '.';
import { AvatarPlaceholder } from '../../layout';

function CommentListSinglePlaceholder() {
  return (
    <CommentListWrapper>
      <div className="comment-card">
        <div className="avatar">
          <AvatarPlaceholder size="sm" shadow={true} />
        </div>
        <div className="info w-100">
          <div className="header">
            <span className="placeholder placeholder-wave ms-2 w-25" />
          </div>
          <div className="body w-100">
            <span className="placeholder placeholder-wave ms-2 w-100" />
          </div>
        </div>
      </div>
    </CommentListWrapper>
  );
}
export default CommentListSinglePlaceholder;
