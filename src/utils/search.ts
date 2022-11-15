import urlcat from 'urlcat';

import { SearchParameters } from '@interfaces/search';
import { BASE_TATOEBA_URL } from '@constants/endpoints';

export const getSearchURL = (params: SearchParameters) => urlcat(
  `${BASE_TATOEBA_URL}sentences/search?`,
  params,
);

export const getSearchParamsFromURL = (url: string) => {
  const queryString = url.slice(url.indexOf('?') + 1, url.length);
  const queryPairs = queryString.split('&');
  const params = {} as SearchParameters;

  queryPairs.forEach((pair) => {
    const values = pair.split('=');
    // @ts-ignore
    params[decodeURIComponent((values[0]))] = decodeURIComponent(values[1]);
  });

  return params;
};
