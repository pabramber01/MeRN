import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useFetchInfiniteScroll = (
  getFunc,
  changeFunc,
  data,
  reachEnd,
  view,
  page
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const isNewPage = view !== page;
    const isEmpty = data.length === 0;
    const hasVScroll = document.body.clientHeight > window.innerHeight;

    if (isNewPage) {
      dispatch(changeFunc({ page }));
    } else if (!reachEnd && (isEmpty || !hasVScroll)) {
      dispatch(getFunc(page));
    } // eslint-disable-next-line
  }, [page, view, data]);
};

export default useFetchInfiniteScroll;
