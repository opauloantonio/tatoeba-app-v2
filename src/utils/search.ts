import urlcat from 'urlcat';

import { SearchParameters } from '@interfaces/search';
import { BASE_TATOEBA_URL } from '@constants/endpoints';

export const getSearchURL = (params: SearchParameters) => urlcat(
  `${BASE_TATOEBA_URL}sentences/search?`,
  params,
);
