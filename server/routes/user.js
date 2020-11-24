// Internal
import { user } from '../services/';

export default (app, pool) => {
  app.post('/createUser', (req, res) =>
    user
      .createUser(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.delete('/deleteUser', (req, res) =>
    user
      .deleteUser(pool, req)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(500).send(err))
  );

  app.get('/getAllUsers', (_, res) =>
    user
      .getAllUsers(pool)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.get('/getUser', (req, res) =>
    user
      .getUser(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );

  app.post('/updateUser', (req, res) =>
    user
      .updateUser(pool, req)
      .then(results => res.status(200).json(results.rows))
      .catch(err => res.status(500).send(err))
  );
};
