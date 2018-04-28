import * as ws from 'ws';
import {IPlaylist} from '../model';
import {Message} from '../model/message.model';

class WebsocketService {

  listeners: Map<string, ws[]>;

  constructor() {
    this.listeners = new Map();
  }

  registerListener(playlistId: string, websocket: ws) {

    if (this.listeners.has(playlistId)) this.listeners.get(playlistId).push(ws);
    else this.listeners.set(playlistId, [ws]);
  }

  sendUpdate(playlist: IPlaylist) {

    const message: Message = {
      type: 'playlist',
      payload: playlist
    };

    const listeners = this.listeners.get(playlist.publicId);
    for (let listener of listeners) listener.send(message);
  }
}

export default new WebsocketService();
