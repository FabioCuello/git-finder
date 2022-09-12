import { Router, Request, Response } from 'express';
import { CatchAsync } from 'src/middlewares';
import { customRedisClient } from 'src/session';
import { COOKIE_OPTIONS } from 'src/config';
import { pgClient } from 'src/db';
import { hashPassword } from 'src/util';
import sequelize from 'sequelize';
const QueryTypes = sequelize.QueryTypes;
const router = Router();

router.post(
  '/register',
  CatchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    // find user in Admin db
    const [user]: { email: string }[] = await pgClient.query(
      `
      SELECT email FROM users WHERE email=:email`,
      {
        replacements: {
          email
        },
        type: QueryTypes.SELECT
      }
    );

    if (user) return res.wrong('Email already taken');

    await pgClient.query(
      `
      INSERT INTO users (email, password) VALUES (:email,:password)
      `,

      {
        replacements: {
          email,
          password: hashPassword(password)
        },
        type: QueryTypes.SELECT
      }
    );

    const session = { email };
    const uuidToken = await customRedisClient.create(session);
    return res.cookie('test_hb', uuidToken, COOKIE_OPTIONS()).success({ email });
  })
);

export { router as register };
