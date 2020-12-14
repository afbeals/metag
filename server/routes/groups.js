import { groups } from '../services/';

export default (app, pool) => {
  app.post('/addGroup', (req, res) => {
    groups
      .addGroup(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err));
  });
  app.post('/createGroup', (req, res) =>
    groups
      .createGroup(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.post('/updateGroup', (req, res) =>
    groups
      .updateGroup(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.delete('/deleteGroup', (req, res) =>
    groups
      .deleteGroup(pool, req)
      .then(results => res.status(200).json(results))
      .catch(err => res.status(500).send(err))
  );

  app.get('/getAllGroups', (req, res) =>
    groups
      .getAllGroups(pool)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.get('/getAvailableGroups', (req, res) =>
    groups
      .getAvailableGroups(pool)
      .then(results => res.status(200).send(results))
      .catch(err => {
        res.status(500).send(err);
      })
  );
};
