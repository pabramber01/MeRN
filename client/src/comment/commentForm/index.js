import CommentForm from './CommentForm';
import commentFormService from './commentFormService';
import commentFormSlice, {
  createComment,
  loadComment,
  updateComment,
  deleteComment,
} from './commentFormSlice';
import CommentFormWrapper from './CommentFormWrapper';

export default CommentForm;
export {
  commentFormService,
  commentFormSlice,
  createComment,
  CommentFormWrapper,
  loadComment,
  updateComment,
  deleteComment,
};
