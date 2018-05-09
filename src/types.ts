import * as Koa from 'koa';
import * as ws from 'ws';

export interface RequestWBody extends Koa.Request {
  body: any;
}
export interface KoaContext extends Koa.Context {
  request: RequestWBody;
}

export interface WSContext extends Koa.Context {
  websocket: ws;
}
