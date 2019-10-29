enum Mode {
  Development,
  Production
}

const startedInProdMode = (process.env.NODE_ENV || '')
  .trim()
  .toLowerCase()
  .startsWith('prod');

const mode = startedInProdMode ? Mode.Production : Mode.Development;

export {
  Mode,
  mode
}
