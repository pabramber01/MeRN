import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getPublication,
  PublicationShowPlaceholder,
  PublicationShowPlaceholderAvatar,
  PublicationShowWrapper,
} from '.';
import { Slider, sliderVH, SuspenseImg } from '../../layout';

function PublicationShow({ publicationId }) {
  const { publication } = useSelector((store) => store.publicationShow);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (publication._id !== publicationId) {
      dispatch(getPublication(publicationId))
        .unwrap()
        .catch(() => navigate('/'));
    } // eslint-disable-next-line
  }, [publicationId]);

  return publication._id !== publicationId ? (
    <PublicationShowPlaceholder />
  ) : (
    <PublicationShowWrapper>
      <div className="publication">
        <div className={`publication-images vh-${sliderVH}`}>
          <Slider
            id="publicationSlider"
            images={publication.images}
            alt={publication.title}
          />
        </div>
        <div className="publication-info">
          <div className="header">
            <h1 className="publication-title">{publication.title}</h1>
          </div>
          <div className="body">
            <p className="publication-description">{publication.description}</p>
          </div>
          <div className="footer">
            <p className="publication-date">
              {publication.createdAt === publication.updatedAt
                ? 'Created on '
                : 'Modified on '}
              {new Date(publication.updatedAt).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <div className="publication-user">
              <Link to={`/users/${publication.user.username}`}>
                <span className="user-name">{publication.user.username}</span>
                <SuspenseImg
                  fallback={<PublicationShowPlaceholderAvatar />}
                  attr={{
                    src: publication.user.avatar,
                    className: 'user-img',
                    alt: publication.user.username,
                  }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PublicationShowWrapper>
  );
}

export default PublicationShow;
