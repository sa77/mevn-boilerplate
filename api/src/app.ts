import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import * as http from "http";
import * as bodyParser from "body-parser"

import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import expressOasGenerator from "express-oas-generator"
import cors from 'cors';
import debug from "debug"

import routes from "./routes"
import { PORT, MONGODB_URL,  } from "./utils/constants"

const app = express();
const server: http.Server = http.createServer(app)
const debugLog: debug.IDebugger = debug("[app]");

// API docs
expressOasGenerator.handleResponses(app, {
  swaggerUiServePath: "v1/docs"
});

// --- middlewares
// parse incoming reqs to JSON
app.use(bodyParser.json())

// allow cross-origin requests
app.use(cors())

// logger config
const winstonLoggerConfig = {
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  )
}
// app.use(expressWinston.logger(winstonLoggerConfig))

// routing
app.use('/v1', routes);

// errorLogger - always put it after the routes
app.use(expressWinston.errorLogger(winstonLoggerConfig))

expressOasGenerator.handleRequests();

app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));

mongoose.connect(MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  debugLog("Connected to MongoDB")
  server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}, mongoDB: ${MONGODB_URL}`);
  });
});


