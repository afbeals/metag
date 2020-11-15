/* eslint-disable max-len */
// External
const { capitalize } = require('../util');

/**
 * @name getHeader
 * @desc generate header for functional component
 * @param {Object} params
 * @param {Array} [params.ext] list of external imports to use
 * @param {Array} [params.int] list of internal imports to use
 * @return {String} The header template
 * @example
 *
 * const myHeader = getHeader({
 *  name,
 *  ext: ['useEffect'],
 *  int: ['modules', ['components', '{ customImport}']]
 * });
 */
const getHeader = ({ int = [] }) => {
  const options = {
    ext: {},
    int: {
      globalUtil: "import globalUtil from '~/GlobalUtil';",
      components: "import ___ from '~/Components';",
      images: "import ___ from '~/Images';",
      modules: "import ___ from '~/Modules';",
    },
  };
  const getIntImports = intOptions => {
    const reqList = [];
    intOptions.forEach(selected => {
      if (Array.isArray(selected)) {
        const [key, importStatement] = selected;
        return (
          options.int[key] &&
          reqList.push(options.int[key].replace('___', importStatement))
        );
      } else {
        return options.int[selected] && reqList.push(options.int[selected]);
      }
    });
    return reqList.length ? `${reqList.join('\n')}` : '';
  };
  return `import {} from 'prop-types';\n${getIntImports(int)}`;
};

/**
 * @name getComponent
 * @desc build the component for the template
 * @param {Object} params
 * @param {String} params.name the component name
 */
const getComponent = ({ name }) => {
  const template = `const ${capitalize(name)} = (props) => {\n  state = {};\n
  render(
    return (<div>${name} component</div>);
  )\n};`;

  return template;
};

const getFooter = ({ name }) => {
  const capitalName = capitalize(name);
  const template = `${capitalName}.defaultProps = {};\n${capitalName}.propTypes = {};\n\nexport default ${capitalName};\n`;

  return template;
};

/**
 * @name buildFunctionalComponent
 * @desc builds template
 * @param {Object} answers
 * @param {String} answers.name the name of the component
 * @param {Array} [answers.ext] the external props
 * @param {Array} [answers.int] the internal props
 */
const buildFunctionalComponent = answers =>
  `// External\n${getHeader(answers)}\n\n// Internal\n\n${getComponent(
    answers
  )}\n\n${getFooter(answers)}\n`;

module.exports = buildFunctionalComponent;
