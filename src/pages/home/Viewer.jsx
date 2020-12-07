// External

// Internal
import { Player, Reel } from './viewer/';
import { Viewer as ViewerStyled } from './Viewer_';

// Constants
const classname = 'viewer';

const Viewer = () => (
  <ViewerStyled className={classname}>
    <Player />
    <Reel />
  </ViewerStyled>
);

Viewer.propTypes = {};

Viewer.defaultProps = {};

export default Viewer;
