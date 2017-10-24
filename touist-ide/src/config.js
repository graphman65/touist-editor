const VERSION = '0.1';
const isDev = process.env.NODE_ENV !== 'production';

export default {
  isDev,
  serverUrl: isDev ? `http://${process.env.SERVER_HOST}` : `https://${process.env.SERVER_HOST}`,
  version: `v${VERSION}${isDev ? '-dev' : ''}`,
};
