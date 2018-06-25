// Required
const http = require('http');
const app = require('./app');

// Server loads app.
const port = 3000;
const server = http.createServer(app);
server.listen(port);
