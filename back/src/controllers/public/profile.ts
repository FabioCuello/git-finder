import { Router, Request } from 'express';
import { RequireAuth, CatchAsync } from '../../middlewares';
import { pgClient } from '../../db';
import { QueryTypes } from 'sequelize';

const router = Router();

router.get(
  '/profile',
  RequireAuth,
  CatchAsync(async (req: Request, res) => {
    const user = req.headers.user;
    const { email } = user;

    const userInfo: { email: string; external_github_ref: string; favorites: any }[] = await pgClient.query(
      `
      SELECT 
      external_github_ref,
      favorites
      FROM users 
      LEFT JOIN github ON github.user_id = users.user_id
      WHERE email=:email
      `,
      {
        replacements: {
          email
        },
        type: QueryTypes.SELECT
      }
    );
    if (userInfo[0].external_github_ref === null) return res.success([]);

    res.success(userInfo);
  })
);

export { router as profile };
