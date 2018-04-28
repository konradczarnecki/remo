import * as Koa from 'koa';
import * as ws from 'ws';
import {Message} from '../model/message.model';

import websocketService from '../service/websocket.service';

export interface WSContext extends Koa.Context {
  websocket: ws;
}

async function newListener(ctx: WSContext) {

  ctx.websocket.on('message', (messageStr: string) => {
    const message: Message = JSON.parse(messageStr);
      console.log(messageStr);
  });

  setTimeout(() => ctx.websocket.send('dupaaaa'), 50);
}

export default { newListener };
