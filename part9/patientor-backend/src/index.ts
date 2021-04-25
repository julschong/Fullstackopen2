import app from './app';
import http from 'http';

const server = http.createServer(app);

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
