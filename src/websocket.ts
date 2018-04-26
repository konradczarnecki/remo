import * as Koa from 'koa';
const websockify = require('koa-websocket');
import * as Router from 'koa-router';

const app = websockify(new Koa());
const router = new Router();

router.all('/:id', async (ctx: Koa.Context) => {

});

app.ws.use(router.routes());
app.listen(3002);
console.log('du[a');
