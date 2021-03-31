// External
import React from 'react';

// Constants
/**
 * @name useUpdateChecker
 * @description hook to report which props are causing an update
 * @param {String} name The name of the component being tested
 * @param {Object} props The component props
 * @example
 * const MyComponent = props => {
 *  useUpdateChecker('MyComponent', props);
 * return <>comp</>
 * }
 */
export const useUpdateChecker = (name, props) => {
  const previousProps = React.useRef();
  const comparator = (prevProps, newProps, currentPath = [], changes = {}) => {
    const isObject = val =>
      typeof val == 'object' && (val instanceof Object) & !Array.isArray(val);
    const allKeys = Object.keys({ ...prevProps, ...newProps });

    allKeys.forEach(key => {
      currentPath.push(key);
      if (isObject(prevProps[key]) && isObject(newProps[key])) {
        comparator(prevProps[key], newProps[key], currentPath, changes);
      } else if (prevProps[key] !== newProps[key]) {
        const keyPath = currentPath.join('.');
        changes[keyPath] = {
          from: prevProps[key],
          to: newProps[key],
        };
      }
    });

    return changes;
  };

  React.useEffect(() => {
    if (previousProps.current) {
      const changes = comparator(previousProps.current, props);
      if (Object.keys(changes).length) {
        console.log(`$c [${name} Updated-Due-T0]: `, 'color: #1a8adc', changes);
      }
    }
    previousProps.current = props;
  });
};

export const useOutsideClick = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default {
  useOutsideClick,
  useUpdateChecker,
};
