import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiEditBoxLine, RiDeleteBin2Line } from 'react-icons/ri';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart';
import { Slider, sliderVH, Spinner, SuspenseImg } from '../../layout';
import {
  loadPublication,
  deletePublication,
  clearFeed,
  likePublication,
  dislikePublication,
} from '..';
import {
  changeLiked,
  clearPublication,
  getPublication,
  PublicationShowPlaceholder,
  PublicationShowPlaceholderAvatar,
  PublicationShowWrapper,
} from '.';

function PublicationShow({ publicationId }) {
  const { currentUser } = useSelector((store) => store.authForm);
  const { publication } = useSelector((store) => store.publicationShow);
  const { isLoading } = useSelector((store) => store.publicationForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (publication._id !== publicationId) {
      dispatch(getPublication(publicationId))
        .unwrap()
        .then((pub) => dispatch(loadPublication(pub.data)))
        .catch(() => navigate('/'));
    } // eslint-disable-next-line
  }, [publicationId]);

  const handleEdit = () => {
    navigate('/publications/edit');
  };

  const handleDelete = () => {
    if (window.confirm('Do you really want to delete this publication?')) {
      dispatch(deletePublication())
        .unwrap()
        .then(() => {
          dispatch(clearFeed());
          navigate('/');
          dispatch(clearPublication());
        });
    }
  };

  const handleLike = () => {
    const action = publication.isLiked ? dislikePublication : likePublication;
    dispatch(action())
      .unwrap()
      .then(() => dispatch(changeLiked()));
  };

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
            <div className="publication-actions">
              {isLoading ? (
                <Spinner color="secondary" small={true} />
              ) : (
                <>
                  <span className="likes">{publication.numLikes}</span>
                  <UseAnimations
                    animation={heart}
                    size={30}
                    onClick={handleLike}
                    type="button"
                    fillColor="var(--bs-secondary)"
                    strokeColor="var(--bs-secondary)"
                    reverse={publication.isLiked}
                  />
                  {publication.user.username === currentUser.username && (
                    <>
                      <RiEditBoxLine
                        size={25}
                        onClick={handleEdit}
                        type="button"
                        className="mx-1"
                      />
                      <RiDeleteBin2Line
                        size={25}
                        onClick={handleDelete}
                        type="button"
                        className="mx-1"
                      />
                    </>
                  )}
                </>
              )}
            </div>
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
              </Link>
              <Link to={`/users/${publication.user.username}`}>
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
