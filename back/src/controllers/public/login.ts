import { Router, Request, Response } from 'express';
import { CatchAsync } from 'src/middlewares';
import { customRedisClient } from 'src/session';
import { hashPassword } from 'src/util';
import { COOKIE_OPTIONS } from 'src/config';
import { pgClient } from 'src/db';
import sequelize from 'sequelize';
const QueryTypes = sequelize.QueryTypes;
const router = Router();

router.post(
  '/login',
  CatchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // find user in Admin db
    const [user]: { email: string }[] = await pgClient.query(
      `
      SELECT email FROM users WHERE email=:email AND password=:password  `,
      {
        replacements: {
          email,
          password: hashPassword(password)
        },
        type: QueryTypes.SELECT
      }
    );

    if (!user) return res.accessDenied();

    const session = { ...user };
    const uuidToken = await customRedisClient.create(session);
    return res.cookie('test_hb', uuidToken, COOKIE_OPTIONS()).success({ email: user.email });
  })
);

export { router as login };
