import createApp from './app';
import { APP_PORT } from './config';
import { pgClient } from './db';

(async () => {
  await pgClient.authenticate();
  const app = createApp();
  app.listen(+APP_PORT, () => {
    console.log('Server on port: ' + APP_PORT);
  });
})();
