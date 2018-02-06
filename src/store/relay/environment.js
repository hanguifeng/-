import {
  Environment,
  Network,
  RecordSource,
  Store,
  QueryResponseCache,
} from 'relay-runtime';

const cache = new QueryResponseCache({ size: 100, ttl: 100000 });
// headers中需要有toke,但暂且不加,不是很需要身份认证
const fetchQuery = (operation, variables, cacheConfig) => {

  // relay catch 缓存使用
  const queryId = operation.name;
  const cachedData = cache.get(queryId, variables);
  const forceLoad = cacheConfig && cacheConfig.force;
  if (!forceLoad && cachedData) {
    return cachedData;
  }
  if (forceLoad) {
    cache.clear();
  }
  return fetch('http://localhost:4000', {
    method: 'POST',
    headers: {
      // add authentication and other headers here
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  })
  .then(response => {
    const res = response.json();
    return res;
  })
  .then(res => {
    // relay的catch
    cache.set(queryId, variables, res);
    return res;
  });
}
const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
