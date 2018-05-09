import { KoaContext } from '../types';
import playlistService from '../service/playlist.service';

async function newPlaylist(ctx: KoaContext) {
  ctx.body = await playlistService.addNewPlaylist();
}

async function addTrack(ctx: KoaContext) {
  const { playlistId, track } = ctx.request.body;
  ctx.body = await playlistService.pushToPlaylist(playlistId, track);
}

async function nextTrack(ctx: KoaContext) {
  const { playlistId } = ctx.request.body;
  ctx.body = await playlistService.nextTrack(playlistId);
}

async function forceTrack(ctx: KoaContext) {
  const { playlistId, track } = ctx.request.body;
  ctx.body = await playlistService.forceToPlaylist(playlistId, track);
}

async function getPlaylist(ctx: KoaContext) {
  const { id } = ctx.query;
  ctx.body = await playlistService.getPlaylist(id);
}

export default { newPlaylist, addTrack, getPlaylist, nextTrack, forceTrack };
