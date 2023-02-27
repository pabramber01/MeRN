import { ConditionalLink, SuspenseImg } from '../../layout';
import {
  FeedSinglePlaceholderAvatar,
  FeedSinglePlaceholderImage,
  FeedWrapper,
} from '.';
import { Link } from 'react-router-dom';

function FeedSingle({ data: { _id, title, images, user }, page }) {
  return (
    <FeedWrapper>
      <div className="photo">
        <Link to={`/publications/${_id}`}>
          <SuspenseImg
            fallback={<FeedSinglePlaceholderImage />}
            attr={{ src: images[0], className: 'main-img', alt: title }}
          />
        </Link>
        <div
          className={`photo-info d-flex justify-content-between align-items-center`}
        >
          <h4 className="m-0">{title}</h4>
          <ConditionalLink
            to={`/users/${user.username}`}
            condition={!page.startsWith('profile')}
          >
            <SuspenseImg
              fallback={<FeedSinglePlaceholderAvatar />}
              attr={{
                src: user.avatar,
                className: 'user-img',
                alt: user.username,
              }}
            />
          </ConditionalLink>
        </div>
      </div>
    </FeedWrapper>
  );
}

export default FeedSingle;
