import { Router, Request, Response } from 'express';
import { CatchAsync, RequireAuth } from 'src/middlewares';
import { pgClient } from 'src/db';
import sequelize from 'sequelize';
const QueryTypes = sequelize.QueryTypes;
const router = Router();

router.post(
  '/addOrModify',
  RequireAuth,
  CatchAsync(async (req: Request, res: Response) => {
    const { email } = req.headers.user;
    const { gitHubRef, favorites } = req.body;

    const [githubQuery]: { favorites: any }[] = await pgClient.query(
      `
      SELECT * FROM github 
      WHERE external_github_ref =:external_github_ref
      AND user_id = (SELECT user_id FROM users WHERE email=:email)
       `,
      {
        replacements: {
          email,
          external_github_ref: gitHubRef
        },
        type: QueryTypes.SELECT
      }
    );

    if (githubQuery !== undefined) {
      await pgClient.query(
        `
      UPDATE github 
      SET favorites=:favorites 
      WHERE 
      external_github_ref=:external_github_ref
      AND
      user_id=(SELECT user_id FROM users WHERE email =:email)
       `,
        {
          replacements: {
            email,
            external_github_ref: gitHubRef,
            favorites: JSON.stringify(favorites)
          },
          type: QueryTypes.SELECT
        }
      );
      return res.success();
    }

    // find user in Admin db
    await pgClient.query(
      `
      INSERT INTO github (external_github_ref,user_id, favorites) VALUES (:external_github_ref, (SELECT user_id FROM users WHERE email=:email), :favorites)
       `,
      {
        replacements: {
          email,
          external_github_ref: gitHubRef,
          favorites: JSON.stringify(favorites)
        },
        type: QueryTypes.SELECT
      }
    );
    res.success();
  })
);

router.put(
  '/modify',
  RequireAuth,
  CatchAsync(async (req: Request, res: Response) => {
    const { email } = req.headers.user;
    const { gitHubRef, favorites } = req.body;

    // find user in Admin db
    await pgClient.query(
      `
      UPDATE github 
      SET favorites=:favorites 
      WHERE 
      external_github_ref=:external_github_ref
      AND
      user_id=(SELECT user_id FROM users WHERE email =:email)
       `,
      {
        replacements: {
          email,
          external_github_ref: gitHubRef,
          favorites: JSON.stringify(favorites)
        },
        type: QueryTypes.SELECT
      }
    );
    res.success();
  })
);

router.delete(
  '/delete',
  RequireAuth,
  CatchAsync(async (req: Request, res: Response) => {
    const { email } = req.headers.user;
    const { gitHubRef } = req.body;

    await pgClient.query(
      `
      DELETE FROM github 
      WHERE 
      external_github_ref=:external_github_ref
      AND
      user_id=(SELECT user_id FROM users WHERE email =:email)
       `,
      {
        replacements: {
          email,
          external_github_ref: gitHubRef
        },
        type: QueryTypes.SELECT
      }
    );

    res.success();
  })
);

export { router as repositories };
