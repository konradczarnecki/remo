import * as Router from 'koa-router';

import playlistCtrl from '../controller/playlist.controller';

const router = new Router();

router.get('/new-playlist', playlistCtrl.newPlaylist);
router.post('/push-track', playlistCtrl.addTrack);
router.get('/get-playlist', playlistCtrl.getPlaylist);
router.post('/next-track', playlistCtrl.nextTrack);
router.post('/force-track', playlistCtrl.forceTrack);

export default router.routes();
