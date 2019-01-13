const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
require('dotenv').config();

const DOMAIN = process.env.DOMAIN;
const CLIENT_ID = process.env.CLIENT_ID;

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${DOMAIN}/.well-known/jwks.json`
  }),

  audience: CLIENT_ID,
  issue: `${DOMAIN}/`,
  algorithms: ['RS256']

});

module.exports = checkJwt;
