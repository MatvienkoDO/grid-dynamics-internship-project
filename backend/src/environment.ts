export enum Mode {
  Development,
  Production
}

const startedInProdMode = (process.env.NODE_ENV || '')
  .trim()
  .toLowerCase()
  .startsWith('prod');

export const mode = startedInProdMode ? Mode.Production : Mode.Development;


const databaseUserPasswordVariableName = 'PROD_DB_USER_PASSWORD';
export const databasePassword = process.env[databaseUserPasswordVariableName] || '';


const cookieSigningSecretKey = 'COOKIE_SIGNING_SECRET';
const productionSecret = process.env[cookieSigningSecretKey] || '';
const developmentSecret = 'DEVELOPMENT_COOKIE_SIGNING_SECRET';

export const cookieSigningSecret = mode === Mode.Production
  ? productionSecret
  : developmentSecret;
