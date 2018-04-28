import * as Router from 'koa-router';

import websocketCtrl from '../controller/websocket.controller';

const router = new Router();

router.all('/register-listener', websocketCtrl.newListener);

export default router.routes();
