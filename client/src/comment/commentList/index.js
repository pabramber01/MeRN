import commentListSlice, {
  getAll,
  changeView,
  changeCommentList,
} from './commentListSlice';
import CommentListWrapper from './CommentListWrapper';
import CommentList from './CommentList';
import CommentListPlaceholder from './CommentListPlaceholder';
import CommentListSingle from './CommentListSingle';
import CommentListSinglePlaceholder from './CommentListSinglePlaceholder';

export default CommentList;
export {
  commentListSlice,
  getAll,
  changeView,
  changeCommentList,
  CommentListWrapper,
  CommentListPlaceholder,
  CommentListSingle,
  CommentListSinglePlaceholder,
};
