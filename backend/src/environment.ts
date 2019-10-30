enum Mode {
  Development,
  Production
}

const startedInProdMode = (process.env.NODE_ENV || '')
  .trim()
  .toLowerCase()
  .startsWith('prod');

const mode = startedInProdMode ? Mode.Production : Mode.Development;

const databaseUserPasswordVariableName = 'PROD_DB_USER_PASSWORD';
const databasePassword = process.env[databaseUserPasswordVariableName] || '';

export {
  Mode,
  mode,
  databasePassword
}
