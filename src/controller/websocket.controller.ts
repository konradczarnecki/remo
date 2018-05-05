import * as Koa from 'koa';
import * as ws from 'ws';
import {Message} from '../model';
import {Playlist} from '../model';

import websocketService from '../service/websocket.service';

export interface WSContext extends Koa.Context {
  websocket: ws;
}

async function newListener(ctx: WSContext) {

  ctx.websocket.on('message', (messageStr: string) => {
    const message: Message = JSON.parse(messageStr);

    if (message.type === 'register')
      websocketService.registerListener(<string> message.payload, ctx.websocket);
  });
}

export default { newListener };
