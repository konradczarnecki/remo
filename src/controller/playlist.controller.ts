import * as Koa from 'koa';

import playlistService from '../service/playlist.service';

async function newPlaylist(ctx: Koa.Context) {
  ctx.body = await playlistService.addNewPlaylist();
}

async function addTrack(ctx: Koa.Context) {
  const { playlistId, track } = ctx.query;
  ctx.body = await playlistService.pushToPlaylist(playlistId, track);
}

async function getPlaylist(ctx: Koa.Context) {
  const { id } = ctx.query;
  ctx.body = await playlistService.getPlaylist(id);
}

export default { newPlaylist, addTrack, getPlaylist };
