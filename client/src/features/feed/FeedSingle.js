import { ConditionalLink, SuspenseImg } from '../../layout';
import {
  FeedSinglePlaceholderAvatar,
  FeedSinglePlaceholderImage,
  FeedWrapper,
} from '.';

function FeedSingle({ data: { title, images, user }, page }) {
  return (
    <FeedWrapper>
      <div className="photo">
        <SuspenseImg
          fallback={<FeedSinglePlaceholderImage />}
          attr={{ src: images[0], alt: title }}
        />
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
