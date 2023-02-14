import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import { changeView, getAll } from '../../context';
import { FeedSingle } from '.';

function Feed({ page }) {
  const { feed, view } = useSelector((store) => store.publication);
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      if (view !== page) dispatch(changeView({ page }));
      dispatch(getAll(page));
    }

    const event = () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 1)
        dispatch(getAll(page));
    };
    window.addEventListener('scroll', event);
    return () => window.removeEventListener('scroll', event); // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      {feed.map((publication) => (
        <div key={publication._id} className="col-md-4">
          <FeedSingle data={publication} />
        </div>
      ))}
    </div>
  );
}

export default Feed;
