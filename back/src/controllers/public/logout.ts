import { Router } from 'express';
import { DAY_IN_MILLI } from '../../util';
import { RequireAuth, CatchAsync } from '../../middlewares';
import { customRedisClient } from '../../session';

const router = Router();

router.post(
  '/logout',
  RequireAuth,
  CatchAsync(async (req, res) => {
    const { uuidCookie } = req.headers;

    // Delete user uuid from Redis & Request obj
    await customRedisClient.deleteAsync(uuidCookie);
    delete req.headers;

    return res
      .cookie('test_hb', 'deleted', {
        expires: new Date(Date.now() - DAY_IN_MILLI)
      })
      .success();
  })
);

export { router as logout };
