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


const jwtSecretKey = 'JWT_SECRET';
const productionJwtSecret = process.env[jwtSecretKey] || '';
const developmentJwtSecret = 'DEVELOPMENT_JWT_SECRET';

export const jwtSecret = mode === Mode.Production
  ? productionJwtSecret
  : developmentJwtSecret;
