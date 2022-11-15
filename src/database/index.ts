import { Configuration } from 'realm';
import { createRealmContext } from '@realm/react';
import { History } from './models/History';

const config: Configuration = {
  schemaVersion: 1,
  schema: [
    History,
  ],
};

const RealmContext = createRealmContext(config);

export default RealmContext;
