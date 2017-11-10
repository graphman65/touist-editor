const VERSION = '0.1';
const isDev = process.env.NODE_ENV !== 'production';

export default {
  isDev,
  version: `v${VERSION}${isDev ? '-dev' : ''}`,
  solvers: ['sat', 'qbf'],
};
