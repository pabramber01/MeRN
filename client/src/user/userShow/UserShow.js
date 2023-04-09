import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isMongoId } from 'validator';
import { DUButton, Avatar } from '../../layout';
import { followUser, unfollowUser } from '../userForm';
import { numberFormatter } from '../../utils';
import { changeFollowList } from '..';
import {
  UserShowWrapper,
  UserShowPlaceholder,
  getUserProfile,
  changeFollowShow,
} from '.';

function UserShow({ username }) {
  const { isLoading, userProfile } = useSelector((store) => store.userShow);
  const { currentUser } = useSelector((store) => store.authForm);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fieldCondition = isMongoId(username)
    ? userProfile._id
    : userProfile.username;

  const myProfile = currentUser.username === username;

  const allPages = {
    getUserProfile: {
      isDoAction: !userProfile.isFollowing,
      doAction: () => followUser(username),
      undoAction: () => unfollowUser(username),
      doText: 'Follow',
      undoText: 'Unfollow',
      thenActions: [
        () => changeFollowList({ ...userProfile }),
        () => changeFollowShow(),
      ],
      changeColor: true,
    },
  };

  useEffect(() => {
    if (username !== fieldCondition) {
      dispatch(getUserProfile(username))
        .unwrap()
        .catch(() => navigate('/'));
    } // eslint-disable-next-line
  }, [username, fieldCondition]);

  return username !== fieldCondition || isLoading ? (
    <UserShowPlaceholder myProfile={myProfile} />
  ) : (
    <UserShowWrapper>
      <div className="profile">
        <div className="profile-data">
          <Avatar url={userProfile.avatar} size="lg" shadow={true} />
          <span className="username">{userProfile.username}</span>
        </div>
        <div className="profile-info">
          <h6>
            {numberFormatter(userProfile.numPublications)} <br /> posts
          </h6>
          <h6>
            {numberFormatter(userProfile.numFollows)} <br /> follows
          </h6>
          <h6>
            {numberFormatter(userProfile.numFollowers)} <br /> followers
          </h6>
        </div>
        {!myProfile && (
          <div className="actions mx-3">
            <DUButton page="getUserProfile" allPages={allPages} />
          </div>
        )}
      </div>
    </UserShowWrapper>
  );
}

export default UserShow;
