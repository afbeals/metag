// External

import MaterialSnackbar from '@material-ui/core/Snackbar';
import { string } from 'prop-types';
import styled from '@emotion/styled/macro';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

// Internal
import { useAppNotification } from '~Modules/app/hooks';
import { constructClass } from '~GlobalUtil/normalize';
import {
  stateError,
  stateWarning,
  stateSuccess,
  fontColorPrimary,
} from '~Styles/abstract/_variables';

// Constant
const classname = 'snackbar';
const definedTypes = {
  error: 'error',
  success: 'success',
  warning: 'warning',
};
const SnackbarStyled = styled.div(({ type }) => ({
  textTransform: 'capitalize',
  '.MuiSnackbarContent-message': {
    color: fontColorPrimary,
    ...(type === definedTypes.error && { color: stateError }),
    ...(type === definedTypes.success && { color: stateSuccess }),
    ...(type === definedTypes.warning && { color: stateWarning }),
  },
}));

const Snackbar = ({ className }) => {
  const { appNotification = null, appHideNotify } = useAppNotification();
  const { timer = 5000, message = '', type = '' } = appNotification || {};
  const baseClass = constructClass([classname, className]);

  return (
    <SnackbarStyled type={definedTypes[type]} className={baseClass}>
      <MaterialSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!appNotification}
        autoHideDuration={timer}
        onClose={appHideNotify}
        message={message}
        action={
          <IconButton
            color='secondary'
            aria-label='close'
            onClick={appHideNotify}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </SnackbarStyled>
  );
};

Snackbar.propTypes = {
  className: string,
};

Snackbar.defaultProps = {
  className: '',
};

export default Snackbar;
