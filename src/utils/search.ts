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

  // TODO I will get rid of the ignores, someday...

  queryPairs.forEach((pair) => {
    const values = pair.split('=');
    // @ts-ignore
    params[decodeURIComponent((values[0]))] = decodeURIComponent(values[1]);
  });

  // @ts-ignore
  params.page = parseInt(params.page, 10);
  // @ts-ignore
  params.list = parseInt(params.list, 10);

  return params;
};
