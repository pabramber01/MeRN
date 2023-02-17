import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { changeProfile, getUserProfile } from '../context';
import { Feed, User } from '../features';

function Profile() {
  const { username } = useParams();
  const { userProfile } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (username !== userProfile.username) {
      dispatch(changeProfile());
      dispatch(getUserProfile(username))
        .unwrap()
        .catch(() => {
          navigate('/');
        });
    } // eslint-disable-next-line
  }, [username]);

  return (
    userProfile.username && (
      <>
        <div className="row">
          <div className="col">
            <User />
          </div>
        </div>
        <div className="row">
          <hr className="border border-danger border-1 m-0 mb-2" />
        </div>
        <Feed page={`profile/${username}`} />
      </>
    )
  );
}

export default Profile;
