import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { changeView, getAll } from '../../context';
import { FeedSingle } from '.';

function Feed({ page }) {
  const { feed, view, reachEnd } = useSelector((store) => store.publication);
  const dispatch = useDispatch();

  useEffect(() => {
    if (view !== page) {
      dispatch(changeView({ page }));
    } else if (document.body.clientHeight <= window.innerHeight) {
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

  return (
    <div className="row">
      {feed.map((publication) => (
        <div
          key={publication._id}
          className="col-md-10 offset-md-1 col-lg-4 offset-lg-0"
        >
          <FeedSingle data={publication} />
        </div>
      ))}
    </div>
  );
}

export default Feed;
