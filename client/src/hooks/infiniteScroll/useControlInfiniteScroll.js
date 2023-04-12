import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const useControlInfiniteScroll = (getFunc, page, reachEnd) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reachEnd) {
      let scrollDebounce = true;
      const event = () => {
        if (
          scrollDebounce &&
          window.scrollY !== 0 &&
          window.innerHeight + window.scrollY >=
            document.body.scrollHeight - 500
        ) {
          scrollDebounce = false;
          dispatch(getFunc(page))
            .unwrap()
            .then(() => (scrollDebounce = true));
        }
      };
      window.addEventListener('scroll', event);
      return () => window.removeEventListener('scroll', event);
    } // eslint-disable-next-line
  }, [reachEnd, page]);
};

export default useControlInfiniteScroll;
