// Internal
import { categories } from '../services/';

export default (app, pool) => {
  app.post('/createCategory', (req, res) =>
    categories
      .createCategory(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.delete('/deleteCategory', (req, res) =>
    categories
      .deleteCategory(pool, req)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
  );

  app.get('/getAllCategories', (_, res) =>
    categories
      .getAllCategories(pool)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.get('/getAvailableCategories', (_, res) =>
    categories
      .getAvailableCategories()
      .then(results => res.status(200).send(results))
      .catch(err => res.status(500).send(err))
  );

  app.post('/updateCategory', (req, res) =>
    categories
      .updateCategory(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );
};
