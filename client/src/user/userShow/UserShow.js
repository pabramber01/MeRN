import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SuspenseImg } from '../../layout';
import {
  UserShowWrapper,
  UserShowPlaceholderAvatar,
  UserShowPlaceholder,
  getUserProfile,
} from '.';

function UserShow({ username }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userProfile } = useSelector((store) => store.userShow);

  useEffect(() => {
    if (username !== userProfile.username) {
      dispatch(getUserProfile(username))
        .unwrap()
        .catch(() => navigate('/'));
    } // eslint-disable-next-line
  }, [username]);

  return username !== userProfile.username ? (
    <UserShowPlaceholder />
  ) : (
    <UserShowWrapper>
      <div className="profile">
        <SuspenseImg
          fallback={<UserShowPlaceholderAvatar />}
          attr={{ src: userProfile.avatar, className: 'user-img', alt: '' }}
        />
        <div className="profile-info">
          <h4>{userProfile.username}</h4>
        </div>
      </div>
    </UserShowWrapper>
  );
}

export default UserShow;
