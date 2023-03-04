import empty from '../../assets/images/empty.svg';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
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
  const dispatch = useDispatch();

  useEffect(() => {
    const isNewPage = view !== page;
    const isFeedEmpty = feed.length === 0;
    const hasVScroll = document.body.clientHeight > window.innerHeight;
    if (isNewPage) {
      dispatch(changeView({ page }));
    } else if (isFeedEmpty || !hasVScroll) {
      dispatch(getAll(page));
    } // eslint-disable-next-line
  }, [page, view, feed]);

  useEffect(() => {
    if (!reachEnd) {
      let scrollDebounce = true;
      const event = () => {
        if (
          scrollDebounce &&
          window.scrollY !== 0 &&
          window.innerHeight + window.scrollY >= document.body.scrollHeight - 1
        ) {
          scrollDebounce = false;
          dispatch(getAll(page));
          setTimeout(() => (scrollDebounce = true), 100);
        }
      };
      window.addEventListener('scroll', event);
      return () => window.removeEventListener('scroll', event);
    } // eslint-disable-next-line
  }, [page, reachEnd]);

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
    </div>
  ) : (
    <div className="row justify-content-center text-center">
      <div className="col-sm-8 col-md-6 col-lg-4">
        <img src={empty} className="img-fluid" alt="Empty feed" />
        <div className="mt-3">
          <h1 className="fst-italic fw-bold">Oops...</h1>
          <h2>No pictures yet</h2>
        </div>
      </div>
    </div>
  );
}

export default PublicationList;
