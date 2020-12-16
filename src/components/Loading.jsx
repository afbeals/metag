// Extenal
import React from 'react';
import { node } from 'prop-types';
import { oneOf } from 'prop-types';

// Constants
const classname = 'loading';

// Component
const Loading = ({ text, size }) => (
  <>
    <div className={`${classname}__wrapper`}>
      <div className={`${classname} ${size}`}>
        <div className='holder'>
          <div className='box'></div>
        </div>
        <div className='holder'>
          <div className='box'></div>
        </div>
        <div className='holder'>
          <div className='box'></div>
        </div>
      </div>
      <p>{text}</p>
    </div>
  </>
);

Loading.propTypes = {
  text: node,
  size: oneOf(['small', 'medium', 'large']),
};

Loading.defaultProps = {
  size: 'medium',
  text: 'Loading...',
};

export default Loading;
