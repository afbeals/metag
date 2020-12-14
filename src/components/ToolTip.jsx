// External
import React, { useEffect, useRef, useState } from 'react';
import { string, node as nodeType, oneOf } from 'prop-types';
import styled from '@emotion/styled/macro';

// Internal
import { constructClass } from '~GlobalUtil/normalize';
import {
  fontColorSecondary,
  secondaryLight,
} from '~Styles/abstract/_variables';

// Constants
const classname = 'tooltip';
const ToolTipStyled = styled.div`
  position: relative;
  user-select: none;
  cursor: pointer;
  -webkit-tap-hightlight-color: transparent;
`;

const ChildWrapper = styled.div`
  color: ${fontColorSecondary};
  position: absolute;
  z-index: 10;
  padding: 8px;
  font-size: 10px;
  cursor: default;
  border-radius: 3px;
  white-space: nowrap;
  font-family: monospace;
  background-color: ${secondaryLight};
  box-shadow: 0 0 0.3rem rgb(223, 213, 213, 61%);
  animation: fadeIn ease-in-out 0.65s;
  .arrow {
    position: absolute;
    width: 0;
    height: 0;
  }
  &.top {
    bottom: calc(100% + 18px);
    left: 50%;
    transform: translateX(-50%);
    .arrow {
      bottom: -8px;
      left: calc(50% - 10px);
      border-right: 10px solid transparent;
      border-top: 10px solid ${secondaryLight};
      border-left: 10px solid transparent;
    }
  }
  &.right,
  &.left {
    top: 50%;
    transform: translateY(-50%);
    .arrow {
      top: calc(50% - 10px);
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
    }
  }
  &.right {
    left: calc(100% + 18px);
    .arrow {
      left: -8px;
      border-right: 10px solid ${secondaryLight};
    }
  }
  &.left {
    right: calc(100% + 18px);
    .arrow {
      left: -8px;
      border-left: 10px solid ${secondaryLight};
    }
  }
  &.bottom {
    top: calc(100% + 18px);
    left: 50%;
    transform: translateX(-50%);
    .arrow {
      top: -8px;
      left: calc(50% - 10px);
      border-right: 10px solid transparent;
      border-bottom: 10px solid ${secondaryLight};
      border-left: 10px solid transparent;
    }
  }
`;

/**
 * @name ToolTip
 * @desc add styled tooltip to content
 * @param {string} [className] appended class name
 * @param {string} title string to use as tooltip message
 * @param {positions} [positions=bottom] - The position of the tooltip
 * @typedef positions {('top'|'bottom'|'left'|'right)}
 * @example
 * <ToolTip title={'my title'} position='left' />
 */
const ToolTip = ({ title, position, children, className }) => {
  // Instance
  const node = useRef();
  const derivedClass = constructClass([className, classname]);

  // state
  const [isVisible, setVisible] = useState(false);

  // Funcs
  const handleHover = () => {
    setVisible(prev => !prev);
  };

  // Lifecycles
  useEffect(() => {
    const currentNode = node.current;
    if (currentNode) {
      currentNode.addEventListener('mouseover', handleHover);
      currentNode.addEventListener('mouseout', handleHover);
    }
    return () => {
      if (currentNode) {
        currentNode.removeEventListener('mouseover', handleHover);
        currentNode.removeEventListener('mouseout', handleHover);
      }
    };
  }, []);

  return (
    <ToolTipStyled className={derivedClass} ref={node}>
      <div className={`${derivedClass}__children`}>{children}</div>
      {isVisible && (
        <ChildWrapper
          title={title}
          className={constructClass([`${derivedClass}__content`, position])}
        >
          <span className='arrow' />
          <p>{title}</p>
        </ChildWrapper>
      )}
    </ToolTipStyled>
  );
};

ToolTip.defaultProps = {
  position: 'bottom',
  classname: '',
};

ToolTip.propTypes = {
  title: string.isRequired,
  position: oneOf(['top', 'bottom', 'left', 'right']),
  children: nodeType.isRequired,
  className: string,
};

export default ToolTip;
