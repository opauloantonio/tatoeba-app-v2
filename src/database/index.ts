import { Configuration } from 'realm';
import { createRealmContext } from '@realm/react';

import { History } from './models/History';
import { Bookmark } from './models/Bookmark';

const config: Configuration = {
  schemaVersion: 2,
  schema: [
    History,
    Bookmark,
  ],
};

const RealmContext = createRealmContext(config);

export default RealmContext;
