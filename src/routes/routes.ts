import * as Router from 'koa-router';
import * as Koa from 'koa';

import playlistCtrl from '../controller/playlist.controller';

const router = new Router();

router.get('/new-playlist', playlistCtrl.newPlaylist);
router.get('/add-track', playlistCtrl.addTrack);

export const routes = router.routes();
