import * as Koa from 'koa';
import * as mongoose from 'mongoose';
import * as bodyParser from 'koa-bodyparser';

const websockify = require('koa-websocket');
const cors = require('@koa/cors');

import { config } from './config';
import { logger } from './util/logging';
import playlistRoutes from './routes/playlist';
import websocketRoutes from './routes/websocket';

mongoose.connect('mongodb://localhost:27017/remotube');

const app = websockify(new Koa());

app.use(cors());
app.use(bodyParser());
app.use(logger);
app.use(playlistRoutes);
app.ws.use(websocketRoutes);

app.listen(config.port);

console.log(`Server running on port ${config.port}`);
