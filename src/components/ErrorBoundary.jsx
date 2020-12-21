// External
import React from 'react';
import PropTypes from 'prop-types';

// Local
import { config } from '../app/';
import appActions from '~Modules/app/actions';

// Constants
const classname = 'error-boundary';
const { store } = config;
const { dispatch } = store;
const {
  app: {
    notify: { show: appShowNotify },
  },
} = appActions;

class ErrorBoundary extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    hasError: false,
  };

  // Catch errors from children
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;
    if (hasError) {
      // eslint-disable-next-line no-console
      console.log('error reported:', { hasError, error, info });
      dispatch(
        appShowNotify({
          message: 'app team notified.',
        })
      );
      return (
        <div className={`${classname}`}>
          <div className={`${classname}__error-message`}>
            An error occurred while loading this content.
          </div>
        </div>
      );
    }
    return children;
  }
}

export default ErrorBoundary;
