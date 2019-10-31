import { Mode, mode, databasePassword } from './environment';

const databaseUserName = 'backend';
const databaseName = 'test';

const clusterAddress = mode === Mode.Production
  ? `mongodb+srv://${databaseUserName}:${databasePassword}@gd-internship-ng-efuaa.mongodb.net`
  : 'mongodb://127.0.0.1:27017';

const databaseUri = `${clusterAddress}/${databaseName}`;

export {
  databaseUri
}
