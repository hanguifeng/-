import { errorHandle } from 'utils/errorHandle';

export const relayRefetch = (relay, fetchVariables, renderVariables, option) => {
  return new Promise((resolve, reject) => {
    relay.refetch(
      fragmentVariables => {
        return {
          ...fragmentVariables,
          ...fetchVariables,
        };
      },
      renderVariables,
      error => {
        if (error) {
          errorHandle(error);
          reject(error);
          return;
        }
        resolve(true);
      },
      { force: option && option.force },
    );
  });
};

export default relayRefetch;
