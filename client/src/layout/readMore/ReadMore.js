import { useState } from 'react';
import ReadMoreWrapper from './ReadMoreWrapper';

function ReadMore({ children }) {
  const [isReadMore, setIsReadMore] = useState(true);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <ReadMoreWrapper>
      <span className="text">
        {isReadMore ? children.slice(0, 100) : children}
        {children.length > 100 && (
          <span onClick={toggleReadMore} className="read-or-hide">
            {isReadMore ? '...read more' : ' show less'}
          </span>
        )}
      </span>
    </ReadMoreWrapper>
  );
}

export default ReadMore;
