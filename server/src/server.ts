/**
 * Module dependencies.
 */
import app from './app';
import http from 'http';
import ErrnoException = NodeJS.ErrnoException;

/**
 * Create HTTP server.
 */

export const server = http.createServer(app);
let port: number | string;

/**
 * Event listener for HTTP server "error" event.
 */

export function setPort(actualPort: number | string) {
  port = actualPort;
}

function onError(error: ErrnoException) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  if (addr === null) return;
  // const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.on('error', onError);
server.on('listening', onListening);
