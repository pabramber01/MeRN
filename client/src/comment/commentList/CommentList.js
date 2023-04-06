import { useSelector } from 'react-redux';
import { useFetchInfiniteScroll, useControlInfiniteScroll } from '../../hooks';
import { Spinner, EmptyData, Modal } from '../../layout';
import {
  CommentListSingle,
  changeView,
  getAll,
  CommentListPlaceholder,
} from '.';
import { CommentForm } from '..';

function CommentList({ page }) {
  const { data, view, reachEnd } = useSelector((store) => store.commentList);

  useFetchInfiniteScroll(getAll, changeView, data, reachEnd, view, page);
  useControlInfiniteScroll(getAll, page, reachEnd);

  return view !== page || (data.length === 0 && !reachEnd) ? (
    <CommentListPlaceholder />
  ) : data.length > 0 ? (
    <>
      <Modal id="editComment" title="Edit comment" button={true}>
        <CommentForm type="edit" />
      </Modal>
      <div className="row">
        {data.map((comment) => (
          <div key={comment._id} className="col-12">
            <CommentListSingle data={comment} />
          </div>
        ))}
        {!reachEnd && (
          <Spinner centered={true} color="secondary" extraClass="my-3" />
        )}
      </div>
    </>
  ) : (
    <EmptyData />
  );
}

export default CommentList;
