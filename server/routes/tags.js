// Internal
import { tags } from '../services/';

export default (app, pool) => {
  app.post('/createTag', (req, res) =>
    tags
      .createTag(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.delete('/deleteTag', (req, res) =>
    tags
      .deleteTag(pool, req)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
  );

  app.get('/getAllTags', (_, res) =>
    tags
      .getAllTags(pool)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.post('/updateTag', (req, res) =>
    tags
      .updateTag(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );
};
