import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { changeView, getAll } from '../../context';
import { FeedSingle } from '.';

function Feed({ page }) {
  const { feed, view, reachEnd, isLoading } = useSelector(
    (store) => store.publication
  );
  const [initGetAll, setInitGetAll] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (view !== page) {
      dispatch(changeView({ page }));
    } // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const hasVScroll = document.body.clientHeight > window.innerHeight;
      if (!hasVScroll) {
        dispatch(getAll(page));
      } else {
        setInitGetAll(false);
      }
    } // eslint-disable-next-line
  }, [initGetAll, isLoading]);

  useEffect(() => {
    if (!reachEnd) {
      let scrollDebounce = true;
      const event = () => {
        if (
          scrollDebounce &&
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
  }, [reachEnd]);

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
