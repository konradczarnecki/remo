import * as Router from 'koa-router';

import playlistCtrl from '../controller/playlist.controller';

const router = new Router();

router.get('/new-playlist', playlistCtrl.newPlaylist);
router.get('/add-track', playlistCtrl.addTrack);
router.get('/get-playlist', playlistCtrl.getPlaylist);
router.get('/next-track', playlistCtrl.nextTrack);
router.get('/force-track', playlistCtrl.forceTrack);

export default router.routes();
