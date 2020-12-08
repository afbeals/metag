// External
import styled from '@emotion/styled/macro';
import MaterialBadge from '@material-ui/core/Badge';
import MaterialListItemText from '@material-ui/core/ListItemText';
import MaterialListItemIcon from '@material-ui/core/ListItemIcon';

// Internal

export const Tags = styled.div``;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ListItemText = styled(MaterialListItemText)`
  text-transform: capitalize;
`;

export const ListItemIcon = styled(MaterialListItemIcon)`
  min-width: 30px !important;
`;

export const Badge = styled(MaterialBadge)`
  span {
    font-size: .6em;
    height: 15px;
    padding: 0 4px;
    min-width 15px;
  }
`;

export default {
  Badge,
  ListItemIcon,
  ListItemText,
  Tags,
  Title,
};
