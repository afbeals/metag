// External
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { useEffect } from 'react';
import { string } from 'prop-types';

// Internal
import { Container, UserImg, UserInfo, InfoLine } from './Profile_';
import { useUserStore } from '~Modules/user/hooks';

// Constants
const classname = '_profile';

const Profile = ({ parentclass }) => {
  const baseClass = `${parentclass}${classname}`;

  const {
    userInfo,
    userIsFetching,
    userLogin,
    userLoginCancel,
  } = useUserStore();

  useEffect(() => {
    if (!userIsFetching && !userInfo) {
      userLogin({ username: 'docjrabg' });
    }
    return () => {
      if (userIsFetching) {
        userLoginCancel();
      }
    };
  }, []);

  const { firstName = '', lastName = '', username = '', id = '' } =
    userInfo || {};

  return (
    <Container className={baseClass}>
      <UserImg>
        <FaceRoundedIcon fontSize='large' />
      </UserImg>
      {userInfo && (
        <UserInfo>
          <InfoLine>
            <span>Username:</span> {username} (id: {id})
          </InfoLine>

          <InfoLine>
            <span>First:</span> {firstName}
          </InfoLine>
          <InfoLine>
            {' '}
            <span>Last:</span> {lastName}
          </InfoLine>
        </UserInfo>
      )}
    </Container>
  );
};

Profile.propTypes = {
  parentclass: string,
};

Profile.defaultProps = {
  parentclass: '',
};

export default Profile;
