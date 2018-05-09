import {Message} from '../model';
import { WSContext } from '../types';

import websocketService from '../service/websocket.service';

async function newListener(ctx: WSContext) {

  ctx.websocket.on('message', (messageStr: string) => {
    const message: Message = JSON.parse(messageStr);

    if (message.type === 'register')
      websocketService.registerListener(<string> message.payload, ctx.websocket);
  });
}

export default { newListener };
