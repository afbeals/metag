// External
const fs = require('fs-extra'); // extend fs module
const path = require('path');
const Handlebars = require('handlebars'); // handle basic templates
const inquirer = require('inquirer'); // prompt user
const colors = require('colors'); // console styling

// Internal
const { lowerFirst, capitalize } = require('./util');

// Constant
// questions for user
const promps = [
  {
    name: 'name',
    type: 'input',
    message: 'Module name?',
  },
  {
    name: 'includes',
    type: 'checkbox',
    message: 'Options to include',
    choices: ['hooks', 'utility', 'persist', 'sagas', 'selectors'],
  },
];

// files always generated
const requiredFiles = [
  {
    src: 'module/actions.handlebars',
    pre: 'src/modules/',
    post: '/actions.js',
  },
  {
    src: 'module/test_templates/actions.handlebars',
    pre: 'src/modules/',
    post: '/__test__/actions.testPartial.js',
  },
  {
    src: 'module/reducer.handlebars',
    pre: 'src/modules/',
    post: '/reducer.js',
  },
  {
    src: 'module/test_templates/reducer.handlebars',
    pre: 'src/modules/',
    post: '/__test__/reducer.testPartial.js',
  },
  {
    src: 'module/types.handlebars',
    pre: 'src/modules/',
    post: '/types.js',
  },
  {
    src: 'module/test_templates/test.handlebars',
    pre: 'src/modules/',
    post: '/__test__/testSuite.test.js',
  },
  {
    src: 'module/index.handlebars',
    pre: 'src/modules/',
    post: '/index.js',
  },
];

// optional files from prompt
const optionalFiles = {
  hooks: {
    src: 'module/hooks.handlebars',
    pre: 'src/modules/',
    post: '/hooks.js',
  },
  utility: {
    src: 'module/utility.handlebars',
    pre: 'src/modules/',
    post: '/util.js',
  },
  persist: {
    src: 'module/persist.handlebars',
    pre: 'src/modules/',
    post: '/persist.js',
  },
  sagas: [
    {
      src: 'module/sagas.handlebars',
      pre: 'src/modules/',
      post: '/sagas.js',
    },
    {
      src: 'module/test_templates/sagas.handlebars',
      pre: 'src/modules/',
      post: '/__test__/sagas.testPartial.js',
    },
  ],
  selectors: [
    {
      src: 'module/test_templates/selectors.handlebars',
      pre: 'src/modules/',
      post: '/__test__/selectors.testPartial.js',
    },
    {
      src: 'module/selectors.handlebars',
      pre: 'src/modules/',
      post: '/selectors.js',
    },
  ],
};

// handle optional array's obj vs arrays
const getOptionals = includes => {
  let optionals = [];
  includes.forEach(inc => {
    if (Array.isArray(optionalFiles[inc])) {
      optionals = [...optionals, ...optionalFiles[inc]];
    } else {
      optionals.push(optionalFiles[inc]);
    }
  });
  return optionals;
};

// Prompt
inquirer
  .prompt(promps)
  .then(({ name, includes }) => {
    const generationFiles = [...requiredFiles, ...getOptionals(includes)];

    const writeFilesPrm = generationFiles.map(async ({ src, pre, post }) => {
      const moduleName = name.toLowerCase().split(' ').join('_');
      const filePath = path.join('../', `${pre}${moduleName}${post}`);
      const fullPath = path.resolve(__dirname, filePath);
      const srcPath = path.join('./templates', src);
      // get template file data
      const sourceData = await fs.readFile(
        path.resolve(__dirname, srcPath),
        'utf8'
      );
      const handlebarsTemplate = Handlebars.compile(sourceData || 'test');
      // generate optional keys
      const templateIncludes = {
        ...(includes.includes('utility') && { util: true }),
        ...(includes.includes('hooks') && { hooks: true }),
        ...(includes.includes('persist') && { persist: true }),
        ...(includes.includes('selectors') && { selectors: true }),
        ...(includes.includes('sagas') && { sagas: true }),
      };

      const contents = handlebarsTemplate({
        name: moduleName,
        camelName: lowerFirst(name),
        capitalName: capitalize(name),
        upperName: moduleName.toUpperCase(),
        ...templateIncludes,
      });

      return fs.outputFile(fullPath, contents, err => {
        if (err) {
          return console.error(
            err,
            '---',
            colors.red(
              `Whoops! Failed to store template: ${post.replace('/', '')}.`
            )
          );
        }

        console.log(
          colors.green(
            `Generated the ${post.replace('/', '')} for ${name} module!`
          )
        );
      });
    });

    return Promise.all(writeFilesPrm);
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      console.error(
        `Error occured while trying to build module files: ${colors.red(
          error.message
        )}`,
        error
      );
    }
  });
