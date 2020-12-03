// External
import fetch from 'axios';

// Local

// Constants
const { REACT_APP_SERVER_PORT } = process.env;
const localServer = `http://localhost:${REACT_APP_SERVER_PORT}`;

const axios = fetch.create({
  baseURL: localServer,
});

export default axios;
