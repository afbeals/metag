/* eslint-disable max-len */
// External
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer'); // prompt user

// Internal
const { functional, util, classComp } = require('./component/');

// const
// generate normalied data object from answers
const normalizedAnswers = ({ effects, name, internal_packages }) => {
  const normalzied = {
    ext: effects,
    int: internal_packages,
    name,
  };
  return normalzied;
};
// parse user input from prompt
const getCustomLocalImports = importString => {
  const ptrn = /(\[\d*.*?\])/;
  const regex = new RegExp(ptrn, 'g');
  const matches = importString.match(regex);
  const evals = [];
  matches.forEach(m => evals.push(eval(m)));

  return evals;
};
const writeFile = ({ isFunctional, directory, ...ans }) => {
  const normalized = normalizedAnswers(ans);
  const compTemplate = isFunctional
    ? functional(normalized)
    : classComp(normalized);
  const srcDir = path.resolve(__dirname, '../');

  fs.writeFile(
    path.join(srcDir, directory, `${util.capitalize(normalized.name)}.js`),
    compTemplate,
    err => {
      if (err) {
        return console.error(
          `Whoops! Failed to create component: ${err.message}.`
        );
      }
    }
  );
};
const prompts = [
  /* Pass your questions in here */
  {
    name: 'name',
    type: 'input',
    message: 'Name of the Component',
  },
  {
    name: 'isFunctional',
    type: 'confirm',
    message: 'Create a functional component?',
    default: true,
  },
  {
    name: 'effects',
    type: 'checkbox',
    message: 'Any react effects?',
    choices: ['useEffect', 'useState', 'useRef'],
    when: ({ isFunctional }) => isFunctional,
  },
  {
    name: 'directory',
    type: 'input',
    message: 'Path for component?',
    default: './src/components',
  },
  {
    name: 'internal_packages',
    type: 'checkbox',
    message: 'Any react effects?',
    choices: ['globalUtil', 'images', 'modules', 'components'],
  },
  {
    name: 'custom_internal_q',
    type: 'confirm',
    message: 'Modify the import of an internal package?',
    default: false,
  },
];

// Or simply write output
inquirer
  .prompt(prompts)
  .then(({ custom_internal_q, internal_packages, ...rest }) => {
    // if user wants named import
    if (custom_internal_q) {
      inquirer
        .prompt([
          {
            name: 'custom_internal',
            type: 'input',
            message: `Array of selected imports to modify from: [${internal_packages.join(
              ', '
            )}] (comma seperated arrays)`,
          },
        ])
        .then(({ custom_internal }) => {
          const adjustedLocalImports = getCustomLocalImports(custom_internal);
          // check if user input keys match one from choices array
          const moddedInternal = internal_packages.map(ip => {
            const found = adjustedLocalImports.findIndex(
              ci => ci[0].toLowerCase() === ip.toLowerCase()
            );
            // if found, replace the string key with user's custom array
            return found > -1 ? adjustedLocalImports[found] : ip;
          });

          writeFile({ internal_packages: moddedInternal, ...rest });
        });
    } else {
      writeFile({ internal_packages, ...rest });
    }
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
