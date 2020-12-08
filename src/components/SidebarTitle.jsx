// External
import styled from '@emotion/styled/macro';
import MaterialPaper from '@material-ui/core/Paper';
import { node, string } from 'prop-types';

// Internal
import { secondaryDark } from '~Styles/abstract/_variables';
import { constructClass } from '~GlobalUtil/normalize';

// Constants
const classname = 'sidebarTitle';
export const SidebarTitle = styled(MaterialPaper)`
  background: ${secondaryDark} !important;
  h4 {
    padding: 8px 5px;
  }
`;

const SidebarTitleRender = ({ title, children, className, ...rest }) => (
  <SidebarTitle
    square
    elevation={2}
    className={constructClass([classname, className])}
    {...rest}
  >
    {!children && <h4>{title}</h4>}
    {children && <>{children}</>}
  </SidebarTitle>
);

SidebarTitleRender.propTypes = {
  children: node.isRequired,
  className: string,
  title: string,
};

SidebarTitleRender.defaultProps = {
  classname: '',
  title: null,
};

export default SidebarTitleRender;
