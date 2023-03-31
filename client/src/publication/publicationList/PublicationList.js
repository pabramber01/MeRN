import { useSelector } from 'react-redux';
import { useFetchInfiniteScroll, useControlInfiniteScroll } from '../../hooks';
import { Spinner, EmptyData } from '../../layout';
import {
  PublicationListSingle,
  changeView,
  getAll,
  PublicationListPlaceholder,
} from '.';

function PublicationList({ page }) {
  const { feed, view, reachEnd } = useSelector(
    (store) => store.publicationList
  );

  useFetchInfiniteScroll(getAll, changeView, feed, reachEnd, view, page);
  useControlInfiniteScroll(getAll, page, reachEnd);

  return view !== page || (feed.length === 0 && !reachEnd) ? (
    <PublicationListPlaceholder />
  ) : feed.length > 0 ? (
    <div className="row">
      {feed.map((publication) => (
        <div
          key={publication._id}
          className="col-md-10 offset-md-1 col-lg-4 offset-lg-0"
        >
          <PublicationListSingle data={publication} page={page} />
        </div>
      ))}
      {!reachEnd && (
        <Spinner centered={true} color="secondary" extraClass="my-3" />
      )}
    </div>
  ) : (
    <EmptyData />
  );
}

export default PublicationList;
