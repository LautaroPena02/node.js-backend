import pino from 'pino';
import fs from 'fs';
const stream = fs.createWriteStream('./logs/app.log', { flags: 'a' });

const logger = pino(
  {
    level: 'info',
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
  },
  stream
);

export default logger;
