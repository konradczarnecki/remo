import * as Router from 'koa-router';

import playlistCtrl from '../controller/playlist.controller';

const router = new Router();

router.get('/new-playlist', playlistCtrl.newPlaylist);
router.get('/add-track', playlistCtrl.addTrack);

export default router.routes();
