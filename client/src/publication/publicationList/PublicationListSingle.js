import { Link } from 'react-router-dom';
import { Avatar, ConditionalLink, SuspenseImg } from '../../layout';
import {
  PublicationListSinglePlaceholderImage,
  PublicationListWrapper,
} from '.';

function PublicationListSingle({ data: { _id, title, images, user }, page }) {
  return (
    <PublicationListWrapper>
      <div className="photo">
        <Link to={`/publications/${_id}`}>
          <SuspenseImg
            fallback={<PublicationListSinglePlaceholderImage />}
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
            <Avatar url={user.avatar} size="sm" shadow={false} color="light" />
          </ConditionalLink>
        </div>
      </div>
    </PublicationListWrapper>
  );
}

export default PublicationListSingle;
