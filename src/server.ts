import * as Koa from 'koa';
import * as mongoose from 'mongoose';

import { config } from './config';
import { logger } from './util/logging';
import { routes } from './routes/routes';

mongoose.connect('mongodb://localhost:27017/remotube');

const app = new Koa();
app.use(logger);
app.use(routes);

app.listen(config.port);

console.log(`Server running on port ${config.port}`);
