// External
import colors from 'colors';

// Internal
import appRoutes from './routes/';

const router = (app, pool) => {
  Object.entries(appRoutes).forEach(([name, route]) => {
    console.log(colors.yellow(`registering routes for ${name}...`));
    route(app, pool);
  });
};

export default router;
