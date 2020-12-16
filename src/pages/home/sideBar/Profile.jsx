// External
import FaceRoundedIcon from '@material-ui/icons/FaceRounded';
import { useEffect } from 'react';
import { string } from 'prop-types';

// Internal
import { Container, UserImg, UserInfo, InfoLine } from './Profile_';
import { useUserStore } from '~Modules/user/hooks';
import { Loading } from '~Components/';

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

  const { first_name = '', last_name = '', username = '', id = '' } =
    userInfo || {};

  return (
    <Container className={baseClass}>
      {userIsFetching && <Loading />}
      <UserImg>
        <FaceRoundedIcon fontSize='large' />
      </UserImg>
      {userInfo && (
        <UserInfo>
          <InfoLine noCap>
            <span>Username:</span> {username} (id: {id})
          </InfoLine>

          <InfoLine>
            <span>First:</span> {first_name}
          </InfoLine>
          <InfoLine>
            {' '}
            <span>Last:</span> {last_name}
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
