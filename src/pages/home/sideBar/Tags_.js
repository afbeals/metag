// External
import styled from '@emotion/styled/macro';
import MaterialBadge from '@material-ui/core/Badge';
import MaterialListItemText from '@material-ui/core/ListItemText';
import MaterialListItemIcon from '@material-ui/core/ListItemIcon';
import MaterialList from '@material-ui/core/List';

// Internal

export const Tags = styled.div`
  height: 100%;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const List = styled(MaterialList)`
  overflow-x: hidden;
  overflow-y: scroll;
  max-height: 100%;
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
  List,
  ListItemIcon,
  ListItemText,
  Tags,
  Title,
};
