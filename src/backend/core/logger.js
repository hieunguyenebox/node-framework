
import winston from 'winston'

const logdir = process.env.LOG_DIR || './log'

export const logger = winston.createLogger({
    level: 'debug', //only log for level less than or equal this
    format: winston.format.json(),
    defaultMeta: { service: 'styless' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: logdir + '/error.log', level: 'error' }),
        new winston.transports.File({ filename: logdir + '/combined.log' })
    ]
  });