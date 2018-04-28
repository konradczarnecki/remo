import * as Koa from 'koa';
import * as mongoose from 'mongoose';

const websockify= require('koa-websocket');

import { config } from './config';
import { logger } from './util/logging';
import httpRoutes from './routes/http';
import websocketRoutes from './routes/websocket';

mongoose.connect('mongodb://localhost:27017/remotube');

const app = websockify(new Koa());

app.use(logger);
app.use(httpRoutes);
app.ws.use(websocketRoutes);

app.listen(config.port);

console.log(`Server running on port ${config.port}`);
