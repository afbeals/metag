// import { useState } from 'react';
import logo from '~Images/logos/logo.svg';
import '~Styles/main.scss';

function App() {
  // const [isHover, updateIsHover] = useState(false);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button className='App-link' link='https://create-react-app.dev/'>
          learn react
        </button>
        {/* <img
          onMouseOver={() => updateIsHover(true)}
          onMouseOut={() => updateIsHover(false)}
          onBlur={() => updateIsHover(false)}
          onFocus={() => updateIsHover(true)}
          src={
            !isHover
              ? 'http://localhost:4250/getMovieImg?movie_id=3'
              : 'http://localhost:4250/getMovieImg?movie_id=3&type=gif'
          }
          alt='movie img'
        />
        <video
          controls
          width='100%'
          poster='http://localhost:4250/getMovieImg?movie_id=3&type=gif'
        >
          <source
            src='http://localhost:4250/streamMovie?id=3'
            type='video/mp4'
          />
          Sorry, your browser doesn't support embedded videos.
        </video> */}
      </header>
    </div>
  );
}

export default App;
