// External
import { render as rtlRender } from '@testing-library/react';
import { Provider } from 'react-redux';

// Internal
// import Router from 'appRouter';
// import rootStore from 'app/store';
import { object } from 'prop-types';

// TEMP
const rootStore = () => {};
const Router = () => {};

const isOjbect = value =>
  value &&
  typeof value === 'object' &&
  value.constructor === Object &&
  value instanceof Object;

/**
 * @name deepMerge
 * @description deeply merge two objects, maps
 * @param { object } original the orignial object tobe merged with
 * @example
 * const repl = { a: { one: 'new value', two: 'value' }}
 * const orig = { a: { one: 'old value' } b: { key: 'value' }}
 *
 * colnst meged = deepMerge(repl, orig); // { a: { one: 'new value', two: 'value' }, b: { key: ' value' }}
 */
const deepMerge = (replacements, original) => {
  if (isOjbect(replacements)) {
    const newCollection = { ...original };
    Object.keys(replacements).forEach(key => {
      const newValue = replacements[key];

      const covertToMap = Map.isMap(newCollection[key]) && !Map.isMap(newValue);
      // const covertToObj = Map.isMap(newcollectin[key]) && !Map.isMap(newValue);
      // const covertToMSet = Map.isMap(newcollectin[key]) && !Map.isMap(newValue);

      if (covertToMap) {
        throw new Error('new store mvalue passed of wrong type, should be Map');
      }

      // newCollection[key] = mergeDeep(newCollection[key], newValue); mergeDeep is from package? or supposed to be deepMerge?
    });
    return newCollection;
  }
  return original;
};

const ConditionalWrapper = ({
  conditoins: { withProvider, withRouter },
  wrappers: { provider, router },
  children,
}) => {
  const checkRouter = withRouter ? router(children) : children;

  return withProvider ? provider(checkRouter) : checkRouter;
};

export const createMockStore = (overrides = {}) => {
  const initialState = rootStore().getState(); // make better?
  return rootStore(deepMerge(overrides, initialState));
};

/**
 * @name testRTLRender
 * @description custom renderer fro RTL testing components
 * @param {JSX.Node} ui the ui element to render
 * @param {object} values custom options for rendering ui
 * @param {object} [values.store] initial redux store to pass to the Provider
 * @param {object} [values.options] RTL options
 * @param {boolean} [values.options.withProvider = true] render the component wit hthe Provider wrapper
 * @param {boolean} [values.options.withRouter = true] render the component with the Router wrapper
 * @example
 * const { container, componentStore, getByText } = gdRender(<Component {...props} />, { options: { withRouter: false }})
 *
 * expect(contianer).toBeTruthy();
 */
export const testRTLRender = (
  ui,
  {
    store = createMockStore(),
    options: { withProvider = true, withRouter = true, ...restOptions } = {},
  }
) => {
  const Wrapper = ({ children }) => (
    <ConditionalWrapper
      conditions={{ withProvider, withRouter }}
      wrappers={{
        provider: child => <Provider store={store}>{child}</Provider>,
        router: child => <Router component={() => child} />,
      }}
    >
      {children}
    </ConditionalWrapper>
  );
  Wrapper.propTypes = {
    children: object.isRequired,
  };

  return {
    ...rtlRender(ui, { wrapper: Wrapper, ...restOptions }),
    componentStore: store,
  };
};

// re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
