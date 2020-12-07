// External

// Internal
import { Viewer, SideBar } from './home/';
import { Home as HomeStyled } from './Home_';

// Constants
const classname = 'home';

const Home = () => (
  <HomeStyled className={classname}>
    <SideBar />
    <Viewer />
  </HomeStyled>
);

export default Home;
